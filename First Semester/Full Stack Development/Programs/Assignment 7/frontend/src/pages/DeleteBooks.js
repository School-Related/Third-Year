import React from "react";
import axios from "axios";
import { Button, Spinner } from "@material-tailwind/react";
import { BaseUrlContext } from "../context/BaseUrlContext";
import Book from "../components/ui/Book";
import { TrashIcon } from "@heroicons/react/24/solid";

const DeleteBooks = () => {
  const [books, setBooks] = React.useState([]);
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

  const deleteBooks = async (id) => {
    await axios
      .delete(apiUrl + "/books/" + id)
      .then((response) => {
        console.log(response.data);
        alert("Book deleted successfully");
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
          Delete Books
        </div>

        <div className="flex rounded-3xl p-8 m-4 mx-16 justify-center flex-wrap">
          {books !== undefined ? (
            books.map((book) => (
              <div className="flex justify-center flex-col gap-0">
                <Book key={book._id} book={book} />
                <Button
                  color="red"
                  className="w-fit self-center flex justify-center items-center gap-4 px-8"
                  onClick={() => deleteBooks(book._id)}
                >
                  <TrashIcon className="h-5 w-5" />
                  Delete
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

export default DeleteBooks;
