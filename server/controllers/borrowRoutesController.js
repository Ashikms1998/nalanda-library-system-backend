import { borrowBook } from "../services/borrowService.js";
import BorrowingRecord from "../models/BorrowingRecord.js";
import Book from "../models/Book.js";
import { errorHandler } from "../utils/error.js";

export const borrowBookController = async (req, res, next) => {
    try {
        const userId = req.user._id; // CHEKC THIS IS WORKING item From JWT middleware
        const { bookId } = req.params;

        const record = await borrowBook(userId, bookId);

        res.status(200).json({ success: true, data: record });
    } catch (error) {
        next(error);
    }
};


export const returnBook = async (req, res, next) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  try {
    const record = await BorrowingRecord.findOne({
      user: userId,
      book: bookId,
      status: "borrowed"
    });

    if (!record) {
      return next(errorHandler(404, "No borrowed record found for this book"));
    }

    // Update status and return date
    record.status = "returned";
    record.returnDate = new Date();
    await record.save();

    // Increment availableCopies
    await Book.findByIdAndUpdate(bookId, {
      $inc: { availableCopies: 1 }
    });

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: record
    });
  } catch (error) {
    console.error("Return Book Error:", error);
    next(errorHandler(500, "Failed to return book"));
  }
};


export const getBorrowHistory = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const records = await BorrowingRecord.find({ user: userId })
      .populate("book", "title author ISBN genre")
      .sort({ borrowDate: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    console.error("Borrow history fetch error:", error);
    next(errorHandler(500, "Failed to fetch borrow history"));
  }
};