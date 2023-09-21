# NovelTea-Library

A simple Library with CRUD operations, made with the MERN Stack.

# Bookstore Project

This project is a simple book store application that consists of a REST API built with Node.js and Express, and a basic frontend.

## Project Structure

The project has the following file structure:

```
bookstore
├── backend
│   ├── controllers
│   │   └── books.js
│   ├── models
│   │   └── Book.js
│   ├── routes
│   │   └── api.js
│   ├── app.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   ├── package.json
│   └── README.md
└── README.md
```

The `backend` directory contains the backend application, which consists of the `controllers`, `models`, and `routes` directories, as well as the `app.js` file, `package.json` file, and `README.md` file.

The `frontend` directory contains the frontend application, which consists of the `index.html`, `main.js`, and `style.css` files, as well as the `package.json` file and `README.md` file.

The root directory contains the main `README.md` file for the project.

## Backend

The backend application is built with Node.js and Express, and uses MongoDB as the database.

### Controllers

The `controllers/books.js` file exports a class `BooksController` which has methods to handle CRUD operations for books. It uses the `Book` model to interact with the database.

### Models

The `models/Book.js` file exports a class `Book` which represents a book in the database. It uses the `mongoose` library to define the schema and model for the book.

### Routes

The `routes/api.js` file exports a function `setApiRoutes` which sets up the API routes for the application. It uses the `BooksController` to handle the routes for books.

### App

The `app.js` file is the entry point of the backend application. It creates an instance of the express app, sets up middleware, and sets up the API routes.

### Package.json

The `package.json` file is the configuration file for npm. It lists the dependencies and scripts for the backend application.

### README.md

The `README.md` file contains the documentation for the backend application.

## Frontend

The frontend application is built with HTML, CSS, and JavaScript.

### Index.html

The `index.html` file is the HTML file for the frontend application. It contains a form to add a book and a table to display the list of books.

### Main.js

The `main.js` file is the JavaScript file for the frontend application. It contains functions to handle form submission and to fetch and display the list of books.

### Style.css

The `style.css` file is the CSS file for the frontend application. It contains styles for the HTML elements in the application.

### Package.json

The `package.json` file is the configuration file for npm. It lists the dependencies and scripts for the frontend application.

### README.md

The `README.md` file contains the documentation for the frontend application.

## Conclusion

This project is a simple example of a book store application built with Node.js, Express, and MongoDB on the backend, and HTML, CSS, and JavaScript on the frontend.
