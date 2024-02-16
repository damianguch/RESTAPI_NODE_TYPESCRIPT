"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controllers/Author"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
// @POST - create author
router.post('/authors', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.create), Author_1.default.createAuthor);
// @GET - get author
router.get('/authors/:authorId', Author_1.default.getAuthor);
// @GET - get authors
router.get('/authors', Author_1.default.getAuthors);
// @GET - update author
router.patch('/authors/:authorId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.update), Author_1.default.updateAuthor);
// @DELETE - delete author
router.delete('/authors/:authorId', Author_1.default.deleteAuthor);
exports.default = router;
