import Book from "../models/Book.js";
import { validationResult } from 'express-validator';
import { addBook, deleteBookById, getAllBooks, updateBook } from "../services/bookServices.js";

export const getBooks = async (req, res,next) => {
    try {
    const { page = 1, limit = 10, genre, author } = req.query;

    const filters = {};
    if (genre) filters.genre = genre;
    if (author) filters.author = author;

    const data = await getAllBooks(filters, page, limit);

    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
}

export const addNewBook = async (req, res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, ISBN, publicationDate, genre, copies,availableCopies } = req.body;
try {
    const book = await addBook({ title, author, ISBN, publicationDate, genre, copies,availableCopies });
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
}



export const updateBookById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const bookId = req.params.id;

  try {
    const book = await updateBook(bookId, req.body);
    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};


export const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    const deleted = await deleteBookById(bookId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};