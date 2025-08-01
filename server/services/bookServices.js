import Book from "../models/Book.js";
import { errorHandler } from "../utils/error.js";

export const addBook = async (bookData) => {
    try {
        const book = await Book.create(bookData);
        return book;
    } catch (error) {
        console.error("Error in addBook service:", error);
        throw errorHandler(500, "Failed to add book");
    }
};


export const updateBook = async (bookId, updatedData) => {
  try {
    const book = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw errorHandler(404, 'Book not found');
    }

    return book;
  } catch (err) {
    throw errorHandler(500, err.message || "Failed to update book");
  }
};


export const deleteBookById = async (id) => {
  try {
    const result = await Book.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw errorHandler(500, 'Error deleting book');
  }
};


export const getAllBooks = async (filters, page, limit) => {
  try {
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find(filters).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Book.countDocuments(filters)
    ]);

    return {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      books,
    };
  } catch (error) {
    throw errorHandler(500, 'Failed to fetch books');
  }
};