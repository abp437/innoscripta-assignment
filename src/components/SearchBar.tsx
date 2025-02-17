import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSearchQuery } from "../app/searchSlice";
import SearchIcon from "./icons/SearchIcon";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isReset, setIsReset] = useState(false);
  const dispatch = useDispatch();

  const getSearchNews = (date = "2025-02-11") => {
    axios({
      method: "get",
      url: "https://newsapi.org/v2/everything",
      params: {
        q: query, // The search query, e.g., "trump"
        from: date, // The dynamic date, e.g., "2025-02-11"
        sortBy: "popularity",
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
      },
    }).then((resp) => {
      console.log(resp.data);
    });
  };

  const getTopHeadlines = () => {
    axios({
      method: "get",
      url: "https://newsapi.org/v2/top-headlines?country=us",
      params: {
        sortBy: "popularity",
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
      },
    }).then((resp) => {
      console.log(resp.data);
    });
  };

  const submitRequest = () => {
    dispatch(setSearchQuery(query));
    getSearchNews();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSearchBlank: boolean = e.target.value.length === 0;
    setQuery(e.target.value);
    setIsReset(isSearchBlank);
  };

  useEffect(() => {
    if (isReset) {
      console.log("Search is made blank reset to initial results set");
      submitRequest();
    }
  }, [isReset]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnterPressed: boolean = e.key === "Enter";

    if (isEnterPressed) {
      submitRequest();
    }
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
          onClick={submitRequest}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
