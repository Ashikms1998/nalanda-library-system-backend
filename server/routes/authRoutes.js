import express from 'express'
import { login, register } from '../controllers/authRoutesControllers.js';
import { loginValidationRules, registerValidationRules } from '../middleware/userValidation.js';

const router = express.Router()

router.post('/register',registerValidationRules,register)
router.post('/login',loginValidationRules,login)



export default router;