import React from "react";
import "./Book.css";

const Book = ({ book }) => {
  return (
    <div className="book_container scale-75 hover:scale-90 duration-500 transition-all transform-gpu">
      <div className="book">
        <div className="front">
          <div
            className="cover"
            style={{
              backgroundImage: `url(${book.image})`,
            }}
          >
            <div className="flex flex-col h-full justify-between p-4">
              <div>
                <p className="text-3xl ml-10 p-4 text-deep-orange-900 rubik bg-gray-300 w-fit rounded m-2 capitalize">
                  {book.title}
                </p>
                <p className="text-3xl ml-10 p-4 text-black rubik bg-gray-300 w-fit rounded m-2 capitalize">
                  {book.author}
                </p>
              </div>
              <p className="text-3xl ml-10 p-4 text-pink-100 rubik bg-black w-fit rounded m-2 ">
                &#8377; {book.price}
              </p>
            </div>
          </div>
        </div>
        <div className="left-side">
          <h2>
            <span>{book.author}</span>
            <span>{book.price}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Book;
