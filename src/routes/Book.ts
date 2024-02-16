import express from 'express';
import controller from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

// @POST - create book
router.post(
  '/books',
  ValidateSchema(Schemas.book.create),
  controller.createBook
);

// @POST - get book
router.get('/books/:bookId', controller.getBook);

// @POST - get books
router.get('/books', controller.getBooks);

// @POST - update book
router.patch(
  '/books/:bookId',
  ValidateSchema(Schemas.book.update),
  controller.updateBook
);

// @POST - delete book
router.delete('/books/:bookId', controller.deleteBook);

export default router;
