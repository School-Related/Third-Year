import React from "react";
import axios from "axios";
import { Button, Spinner } from "@material-tailwind/react";
import { BaseUrlContext } from "../context/BaseUrlContext";
import Book from "../components/ui/Book";
import {
  BookmarkIcon,
  CurrencyRupeeIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";

const UpdateBooks = () => {
  const [books, setBooks] = React.useState([]);

  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [price, setPrice] = React.useState("");

  const { baseUrl } = React.useContext(BaseUrlContext);
  const apiUrl = baseUrl;
  const retrieve_books = async () => {
    const response = await axios
      .get(apiUrl + "/books")
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        alert("some error occured");
      });
    setBooks(response);
  };

  const updateBooks = async (
    id,
    book_title,
    book_author,
    book_genre,
    book_price,
  ) => {
    console.log(title, author, genre, price);
    // check if atleast one field is filled
    if (
      title.length === 0 &&
      author.length === 0 &&
      genre.length === 0 &&
      price.length === 0
    ) {
      alert("Please fill atleast one field");
      return;
    }

    await axios
      .put(
        apiUrl + "/books/" + id,
        {},
        {
          params: {
            title: title.length > 0 ? title : book_title,
            author: author.length > 0 ? author : book_author,
            genre: genre.length > 0 ? genre : book_genre,
            price: price.length > 0 ? price : book_price,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        alert("Book updated successfully");
        setTitle("");
        setAuthor("");
        setGenre("");
        setPrice("");
        // get all the input fields
        // and set their value to empty string
        // this will clear the input fields
        const inputFields = document.querySelectorAll("input");
        console.log(inputFields);
        inputFields.forEach((inputField) => {
          inputField.value = "";
        });

        retrieve_books();
      })
      .catch((error) => {
        console.log(error);
        alert("some error occured");
      });
  };

  React.useEffect(() => {
    retrieve_books();
  }, []);
  return (
    <div>
      <div class="flex justify-center p-4 m-4 flex-col gap-4 items-center">
        <div class="text-5xl outline p-4 rounded-full px-16 text-pink-900">
          Update Books
        </div>

        <div className="flex rounded-3xl p-8 m-4 mx-16 justify-center flex-wrap">
          {books !== undefined ? (
            books.map((book) => (
              <div className="flex justify-center flex-col gap-0 items-center">
                <Book key={book._id} book={book} />
                <div className="w-72 my-1">
                  <Input
                    label="Change Title"
                    key={book._id}
                    icon={<BookmarkIcon className="h-5 w-5" />}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-72 my-1">
                  <Input
                    onChange={(e) => setAuthor(e.target.value)}
                    key={book._id}
                    label="Change Author"
                    icon={<UserIcon className="h-5 w-5" />}
                  />
                </div>
                <div className="w-72 my-1">
                  <Input
                    label="Change Price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    key={book._id}
                    icon={<CurrencyRupeeIcon className="h-5 w-5" />}
                  />
                </div>
                <Button
                  color="blue"
                  className="w-fit self-center flex justify-center items-center gap-4 px-8 my-4"
                  onClick={() =>
                    updateBooks(
                      book._id,
                      book.title,
                      book.author,
                      book.genre,
                      book.price,
                    )
                  }
                >
                  <PencilIcon className="h-5 w-5" />
                  Update
                </Button>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateBooks;
