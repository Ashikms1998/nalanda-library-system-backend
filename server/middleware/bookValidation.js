import { body } from 'express-validator';

export const addBookValidationRules = [
    body('title', 'Title is required').notEmpty(),
    body('author', 'Author is required').notEmpty(),
    body('ISBN', 'ISBN is required').notEmpty(),
    body('publicationDate', 'publicationDate is required').notEmpty(),
    body('genre', 'genre is required').notEmpty(),
    body('copies', 'Number of copies is required').notEmpty(),
    body('availableCopies', 'availableCopies must be a non-negative number').optional().isInt({ min: 0 })

];

export const updateBookValidationRules = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('author').optional().notEmpty().withMessage('Author cannot be empty'),
  body('ISBN').optional().notEmpty().withMessage('ISBN cannot be empty'),
  body('publicationDate').optional().notEmpty().withMessage('Publication Date cannot be empty'),
  body('genre').optional().notEmpty().withMessage('Genre cannot be empty'),
  body('copies').optional().isInt({ min: 0 }).withMessage('Copies must be 0 or more'),
  body('availableCopies').optional().isInt({ min: 0 }).withMessage('Available copies must be 0 or more'),
];