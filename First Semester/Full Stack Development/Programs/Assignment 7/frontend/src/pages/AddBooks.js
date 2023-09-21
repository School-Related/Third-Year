import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import {
  BookmarkIcon,
  CurrencyRupeeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { BaseUrlContext } from "../context/BaseUrlContext";

const AddBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const { baseUrl } = React.useContext(BaseUrlContext);
  const apiUrl = baseUrl;
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if all fields are filled
    if (!title || !author || !genre || !price) {
      alert("Please fill all the fields");
      return;
    }

    // send request to add book
    axios
      .post(
        apiUrl + "/books",
        {},
        {
          params: {
            title: title,
            author: author,
            genre: genre,
            price: price,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        // clear all values
        setTitle("");
        setAuthor("");
        setGenre("");
        setPrice("");
        alert("Book added successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("some error occured");
      })
      .finally(() => {
        // clear all values
        setTitle("");
        setAuthor("");
        setGenre("");
        setPrice("");
      });
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex justify-center p-4 m-4 flex-col gap-4 items-center">
        <div className="text-5xl outline p-4 rounded-full px-16 text-pink-900">
          Add Books
        </div>
        <div className="bg-pink-50 text-3xl rounded-3xl p-8 m-4 ">
          Welcome to the Book Addition Page of our library! We believe in the
          power of community and collective knowledge. By contributing your
          favorite books to our library, you're not only sharing stories but
          also enriching the literary tapestry for all our readers.
          <br></br>
          <br></br>
          By adding your book to our library, you become an integral part of our
          literary journey. Together, we build a collection that embodies the
          diverse tastes and passions of our community. Thank you for helping us
          create a tapestry of stories that enriches the lives of our readers.
        </div>
      </div>

      <div className="flex rounded-3xl p-8 m-4 w-full mx-16 justify-center flex-col items-center gap-9">
        <form onSubmit={handleSubmit} className="flex gap-8">
          <div className="w-72 my-1">
            <label className="text-2xl">Title</label>
            <Input
              label="Title"
              value={title}
              icon={<BookmarkIcon className="h-5 w-5" />}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-72 my-1">
            <label className="text-2xl">Author</label>
            <Input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              icon={<UserIcon className="h-5 w-5" />}
            />
          </div>
          <div class="relative h-10 w-72 min-w-[200px]">
            <label className="text-2xl">Genre</label>
            <select
              class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="brazil">Fiction</option>
              <option value="bucharest">Non-Fiction</option>
              <option value="london">Biography</option>
            </select>
          </div>
          <div className="w-72 my-1">
            <label className="text-2xl">Price</label>
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              icon={<CurrencyRupeeIcon className="h-5 w-5" />}
            />
          </div>
        </form>
        <Button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add Book
        </Button>
      </div>
    </div>
  );
};

export default AddBooks;
