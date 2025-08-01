import express from 'express'
import { authorize, protect } from '../middleware/authMiddleware.js';
import { addNewBook, deleteBook, getBookAvailabilityReport, getBooks, getMostActiveMembers, getMostBorrowedBooks, updateBookById } from '../controllers/bookRoutesControllers.js';
import { addBookValidationRules, updateBookValidationRules } from '../middleware/bookValidation.js';
const router = express.Router()

router.get('/',protect,getBooks)
router.post('/addnewbook',protect,authorize('Admin'),addBookValidationRules,addNewBook)
router.put('/:id',protect,authorize('Admin'),updateBookValidationRules,updateBookById);
router.delete('/:id', protect, authorize('Admin'), deleteBook);


router.get('/most-borrowed', protect, authorize('Admin'), getMostBorrowedBooks);
router.get('/most-active-members', protect, authorize('Admin'), getMostActiveMembers);
router.get('/book-availability', protect, authorize('Admin'), getBookAvailabilityReport);
export default router;