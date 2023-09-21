import { Navbar, Typography, Button, Input } from "@material-tailwind/react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { SolarTeaCupBoldDuotone } from "./ui/SolarTeaCupBoldDuotone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrlContext } from "../context/BaseUrlContext";
import React from "react";
import { SearchResultsContext } from "../context/SearchResults";

export function NavbarWithSearch() {
  const apiUrl = React.useContext(BaseUrlContext).baseUrl;
  const { setSearchResults } = React.useContext(SearchResultsContext);
  const navigate = useNavigate();
  const search_books = () => {
    // check if atleast one field is filled
    if (searchTerm.length === 0) {
      alert("Please Enter the name of the Book to search.");
      return;
    }
    axios
      .get(apiUrl + "/books")
      .then((response) => {
        console.log(response.data);
        // filter books
        const filtered = response.data.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setSearchResults(filtered);
        navigate("/search_results");
        setSearchTerm("");
      })
      .catch((error) => {
        console.log(error);
        alert("some error occured");
      });
  };

  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <Navbar
      className="mx-auto max-w-screen-xl px-4 py-3 w-screen rounded-full bg-pink-50 block"
      shadow="true"
      blurred="true"
      fullWidth="true"
      color="white"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5 flex gap-2 items-center text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          <SolarTeaCupBoldDuotone />
          NovelTea Library
        </Typography>
        <div className="ml-auto flex gap-4 md:mr-4">
          <Button
            className="flex gap-2 items-center justify-center"
            size="sm"
            color="pink"
            onClick={() => {
              navigate("/add_books");
            }}
          >
            <PlusIcon className="w-5 h-5" />
            Add Books
          </Button>
          <Button
            className="flex gap-2 items-center justify-center"
            size="sm"
            color="pink"
            onClick={() => {
              navigate("/delete_books");
            }}
          >
            <TrashIcon className="w-5 h-5" />
            Delete Books
          </Button>
          <Button
            className="flex gap-2 items-center justify-center"
            size="sm"
            color="pink"
            onClick={() => {
              navigate("/update_books");
            }}
          >
            <PencilIcon className="w-5 h-5" />
            Update Books
          </Button>
        </div>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="pink"
            value={searchTerm}
            label="Search by Name"
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Button
            size="sm"
            color="pink"
            className="!absolute right-1 top-1 rounded"
            onClick={() => {
              search_books();
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default NavbarWithSearch;
