import "./style.css";
import NavbarWithSearch from "./components/NavbarWithSearch";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBooks from "./pages/AddBooks";
import DeleteBooks from "./pages/DeleteBooks";
import UpdateBooks from "./pages/UpdateBooks";
import { BaseUrlProvider } from "./context/BaseUrlContext";
import { SearchResultsContextProvider } from "./context/SearchResults";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <BaseUrlProvider>
      <SearchResultsContextProvider>
        <div className="pt-5">
          <NavbarWithSearch />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add_books" element={<AddBooks />} />
            <Route path="/delete_books" element={<DeleteBooks />} />
            <Route path="/update_books" element={<UpdateBooks />} />
            <Route path="/search_results" element={<SearchResult />} />
          </Routes>
        </div>
      </SearchResultsContextProvider>
    </BaseUrlProvider>
  );
}

export default App;
