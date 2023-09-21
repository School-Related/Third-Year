const Book = require("../models/Book");
const axios = require("axios");

async function getRandomImageUrl() {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      headers: {
        Authorization: "Client-ID UBAXKPq5WgOxU9z7XjLZrt8B0hayG2dv8gh_vyGQg-0",
      },
    });

    return response.data.urls.regular;
  } catch (error) {
    console.error(error);
    return null;
  }
}
class BooksController {
  async getAllBooks(req, res) {
    console.log("Received Request to get all books, sending now. ");
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getBookById(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createBook(req, res) {
    console.log("Adding new Book, Received Request", req.query);
    const image = await getRandomImageUrl();
    const book = new Book({
      title: req.query.title,
      author: req.query.author,
      genre: req.query.genre,
      price: req.query.price,
      image: image,
    });

    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateBook(req, res) {
    console.log("Received Request to update Book", req.query);
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      book.title = req.query.title || book.title;
      book.author = req.query.author || book.author;
      book.genre = req.query.genre || book.genre;
      book.price = req.query.price || book.price;

      const updatedBook = await book.save();
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteBook(req, res) {
    console.log("Request to Delete Book Received.", req.params);
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      await book.remove();
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BooksController;
