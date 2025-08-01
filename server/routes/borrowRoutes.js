import express from 'express';
import { borrowBookController, returnBook ,getBorrowHistory} from '../controllers/borrowRoutesController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only authenticated members can borrow books
router.post('/:bookId/borrow', protect, authorize('member'), borrowBookController);
router.post("/books/:bookId/return", protect, authorize("member"), returnBook);
router.get("/history", protect, authorize("member"), getBorrowHistory);

export default router;