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


//Book Stats Controllers

export const getMostBorrowedBooks = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10; //req.query.limit is a string from the URL tp convert we use parseInt

    const mostBorrowedBooks = await BorrowingRecord.aggregate([
      {
        $group: {
          _id: '$book',
          borrowCount: { $sum: 1 }
        }
      },
      { $sort: { borrowCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $unwind: '$bookDetails'
      },
      {
        $project: {
          _id: 0,
          bookId: '$bookDetails._id',
          title: '$bookDetails.title',
          author: '$bookDetails.author',
          genre: '$bookDetails.genre',
          borrowCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: mostBorrowedBooks.length,
      data: mostBorrowedBooks
    });
  } catch (error) {
    next(error);
  }
};