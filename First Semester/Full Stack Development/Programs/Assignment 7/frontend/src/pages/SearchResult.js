import React from "react";
import axios from "axios";
import Book from "../components/ui/Book";
import { SearchResultsContext } from "../context/SearchResults";

const SearchResult = () => {
  const { searchResults } = React.useContext(SearchResultsContext);

  return (
    <div>
      <div class="flex justify-center p-4 m-4 flex-col gap-4 items-center">
        <div class="text-5xl outline p-4 rounded-full px-16 text-pink-900">
          Your Search Results
        </div>

        <div className="flex rounded-3xl p-8 m-4 mx-16 justify-center flex-wrap">
          {searchResults !== undefined ? (
            searchResults.map((book) => (
              <div className="flex justify-center flex-col gap-0">
                <Book key={book._id} book={book} />
              </div>
            ))
          ) : (
            <div className="text-4xl">No Results Found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
