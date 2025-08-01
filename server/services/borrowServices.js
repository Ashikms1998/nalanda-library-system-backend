import Book from "../models/Book.js";
import BorrowingRecord from "../models/BorrowingRecord.js";
import { errorHandler } from "../utils/error.js";

export const borrowBook = async (userId, bookId) => {
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
        throw errorHandler(404, "Book not found");
    }

    // Check availability
    if (book.availableCopies < 1) {
        throw errorHandler(400, "No available copies to borrow");
    }

    // Create borrowing record
    const record = await BorrowingRecord.create({
        user: userId,
        book: bookId,
        borrowDate: new Date(),
        status: 'borrowed'
    });

    // Decrease available copies
    book.availableCopies -= 1;
    await book.save();

    return record;
};