"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../controllers/Book"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
// @POST - create book
router.post('/books', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.create), Book_1.default.createBook);
// @POST - get book
router.get('/books/:bookId', Book_1.default.getBook);
// @POST - get books
router.get('/books', Book_1.default.getBooks);
// @POST - update book
router.patch('/books/:bookId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.update), Book_1.default.updateBook);
// @POST - delete book
router.delete('/books/:bookId', Book_1.default.deleteBook);
exports.default = router;
