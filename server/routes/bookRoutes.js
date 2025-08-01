import express from 'express'
import { authorize, protect } from '../middleware/authMiddleware.js';
import { addNewBook, deleteBook, getBooks, updateBookById } from '../controllers/bookRoutesControllers.js';
import { addBookValidationRules, updateBookValidationRules } from '../middleware/bookValidation.js';
const router = express.Router()

router.get('/',protect,getBooks)
router.post('/addnewbook',protect,authorize('admin'),addBookValidationRules,addNewBook)
router.put('/books/:id',protect,authorize('admin'),updateBookValidationRules,updateBookById);
router.delete('/:id', protect, authorize('admin'), deleteBook);


export default router;