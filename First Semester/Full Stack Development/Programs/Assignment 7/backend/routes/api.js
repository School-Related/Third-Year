const express = require("express");
const router = express.Router();
const BooksController = require("../controllers/books");

const booksController = new BooksController();

router.get("/books", booksController.getAllBooks);
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.get("/books/:id", booksController.getBookById);
router.post("/books", booksController.createBook);
router.put("/books/:id", booksController.updateBook);
router.delete("/books/:id", booksController.deleteBook);

module.exports = router;
