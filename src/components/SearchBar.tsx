import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSearchQuery } from "../app/searchSlice";
import { setSearchResults } from "../app/searchResultsSlice"; // Import the setSearchResults action
import SearchIcon from "./icons/SearchIcon";
import ArticleInterface from "../interfaces/ArticleInterface";
import { formatDateToYesterday } from "../utils/date";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Function to fetch news
  const searchNewsOrg = (searchQuery: string = "") => {
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

  const searchNYTimes = (searchQuery: string = "") => {
    const params = {
      "api-key": import.meta.env.VITE_NEW_YORK_TIMES_API_KEY,
    };

    if (searchQuery) {
      // Search specific query news
      axios
        .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", { params: { ...params, q: searchQuery } })
        .then((resp) => {
          const articles: ArticleInterface[] = resp.data.response.docs.map((doc: any) => ({
            title: doc?.headlines?.main || doc?.snippet || "Hypethetical Question",
            description: doc?.lead_paragraph || "Hypethetical Question",
            url: doc.web_url || "Hypethetical Question",
            urlToImage: `https://static01.nyt.com/${doc?.multimedia?.[0]?.url}`,
            source: "New York Times",
          }));
          dispatch(setSearchResults(articles));
        });
    } else {
      // Fetch top headlines if no search query
      axios.get("https://api.nytimes.com/svc/topstories/v2/home.json", { params }).then((resp) => {
        const articles: ArticleInterface[] = resp.data.results.map((doc: any) => ({
          title: doc.title,
          description: doc.abstract,
          url: doc.url,
          urlToImage: doc.multimedia?.[0]?.url || "", // Fallback in case of no image
          source: "New York Times",
        }));
        dispatch(setSearchResults(articles));
      });
    }
  };

  const searchGuardian = (searchQuery: string) => {
    const params = {
      "api-key": import.meta.env.VITE_THE_GUARDIAN_API_KEY,
    };

    axios.get("https://content.guardianapis.com/search", { params: { ...params, q: searchQuery } }).then((resp) => {
      const articles: ArticleInterface[] = resp.data.response.results.map((doc: any) => ({
        title: doc.webTitle,
        description: `${doc.sectionName} - ${doc.webTitle}`,
        url: doc.webUrl,
        urlToImage: null, // Fallback in case of no image
        source: "The Guardian",
      }));
      dispatch(setSearchResults(articles));
    });
  };

  const submitRequest = () => {
    if (query.trim()) {
      dispatch(setSearchQuery(query)); // Dispatch query to Redux
      searchNewsOrg(query); // Fetch news for the query
      searchNYTimes(query);
      searchGuardian(query);
    } else {
      searchNewsOrg(); // Fetch top headlines if search query is blank
      searchNYTimes();
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
