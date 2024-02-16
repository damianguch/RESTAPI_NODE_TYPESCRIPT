import express from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

// @POST - create author
router.post(
  '/authors',
  ValidateSchema(Schemas.author.create),
  controller.createAuthor
);

// @GET - get author
router.get('/authors/:authorId', controller.getAuthor);

// @GET - get authors
router.get('/authors', controller.getAuthors);

// @GET - update author
router.patch(
  '/authors/:authorId',
  ValidateSchema(Schemas.author.update),
  controller.updateAuthor
);

// @DELETE - delete author
router.delete('/authors/:authorId', controller.deleteAuthor);

export default router;
