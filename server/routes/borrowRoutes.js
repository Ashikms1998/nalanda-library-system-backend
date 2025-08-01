import express from 'express';
import { borrowBookController, returnBook ,getBorrowHistory} from '../controllers/borrowRoutesController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only authenticated members can borrow books
router.post('/:bookId/borrow', protect, authorize('Member'), borrowBookController);
router.post("/books/:bookId/return", protect, authorize("Member"), returnBook);
router.get("/history", protect, authorize("Member"), getBorrowHistory);

export default router;