import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSearchQuery } from "../app/searchSlice";
import { setSearchResults } from "../app/searchResultsSlice"; // Import the setSearchResults action
import SearchIcon from "./icons/SearchIcon";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Function to format the date for yesterday
  const formatDateToYesterday = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
  };

  // Function to fetch news
  const fetchNews = (searchQuery: string = "") => {
    const params = {
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
      sortBy: "popularity",
    };

    if (searchQuery) {
      // Search specific query news
      axios
        .get("https://newsapi.org/v2/everything", {
          params: { ...params, q: searchQuery, from: formatDateToYesterday() },
        })
        .then((resp) => dispatch(setSearchResults(resp.data.articles)));
    } else {
      // Fetch top headlines if no query
      axios
        .get("https://newsapi.org/v2/top-headlines?country=us", { params })
        .then((resp) => dispatch(setSearchResults(resp.data.articles)));
    }
  };

  const submitRequest = () => {
    if (query.trim()) {
      dispatch(setSearchQuery(query)); // Dispatch query to Redux
      fetchNews(query); // Fetch news for the query
    } else {
      fetchNews(); // Fetch top headlines if search query is blank
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitRequest(); // Trigger search on Enter key press
  };

  return (
    <div className="flex justify-center py-4">
      <div className="relative w-full mx-4 md:w-1/2">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search news, topics & more..."
          className="w-full pl-4 pr-8 py-2 border-1 focus:outline-none"
        />
        <button
          className="absolute p-2 top-0 right-0 bottom-0 cursor-pointer border-l-1"
          aria-label="Search"
          onClick={submitRequest} // Trigger search when the button is clicked
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
