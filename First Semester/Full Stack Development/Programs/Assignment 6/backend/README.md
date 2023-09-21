# Backend

This is the backend application for the Bookstore project. It is built using Node.js and Express, and uses MongoDB as the database.

## Installation

To install the dependencies, run the following command:

```
npm install
```

## Usage

To start the server, run the following command:

```
npm start
```

The server will start listening on port 3000 by default.

## API Routes

The following API routes are available:

- `GET /api/books`: Get a list of all books
- `GET /api/books/:id`: Get a book by ID
- `POST /api/books`: Add a new book
- `PUT /api/books/:id`: Update a book by ID
- `DELETE /api/books/:id`: Delete a book by ID

## Controllers

The `BooksController` class in `controllers/books.js` handles the CRUD operations for books.

## Models

The `Book` class in `models/Book.js` represents a book in the database. It uses the `mongoose` library to define the schema and model for the book.

## Routes

The `setApiRoutes` function in `routes/api.js` sets up the API routes for the application. It uses the `BooksController` to handle the routes for books.
