import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSearchQuery } from "../app/searchSlice";
import { setOriginalArticles, setSearchResults } from "../app/searchResultsSlice";
import { setSourceFilter, setCategoryFilter, setOrderByFilter } from "../app/filtersSlice";
import SearchIcon from "./icons/SearchIcon";
import ArticleInterface from "../interfaces/ArticleInterface";
import { shuffleArray } from "../utils/array";
import { formatDateToYesterday } from "../utils/date";
import { convertNYTimesResponse, convertNewsOrgResponse, convertGuardianResponse } from "../utils/article";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // Combine results from multiple sources
  const combineResults = (articles: ArticleInterface[], newArticles: ArticleInterface[]) => {
    return [...articles, ...newArticles];
  };

  // Function to search news from NewsOrg API
  const searchNewsOrg = async (searchQuery: string = "") => {
    const params = {
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
      sortBy: "popularity",
    };
    let results: ArticleInterface[] = [];

    try {
      if (searchQuery) {
        const resp = await axios.get("https://newsapi.org/v2/everything", {
          params: { ...params, q: searchQuery, from: formatDateToYesterday() },
        });
        results = resp.data.articles.map(convertNewsOrgResponse);
      } else {
        const resp = await axios.get("https://newsapi.org/v2/top-headlines?country=us", { params });
        results = resp.data.articles.map(convertNewsOrgResponse);
      }
    } catch (error) {
      console.error("Error fetching NewsOrg data", error);
    }

    return results;
  };

  const searchNYTimes = async (searchQuery: string = "") => {
    const params = {
      "api-key": import.meta.env.VITE_NEW_YORK_TIMES_API_KEY,
    };
    let results: ArticleInterface[] = [];

    try {
      if (searchQuery) {
        const resp = await axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
          params: { ...params, q: searchQuery },
        });
        results = resp.data.response.docs.map(convertNYTimesResponse);
      } else {
        const resp = await axios.get("https://api.nytimes.com/svc/topstories/v2/home.json", { params });
        results = resp.data.results.map(convertNYTimesResponse);
      }
    } catch (error) {
      console.error("Error fetching NYTimes data", error);
    }

    return results;
  };

  // Function to search news from Guardian API
  const searchGuardian = async (searchQuery: string = "") => {
    const params = {
      "api-key": import.meta.env.VITE_THE_GUARDIAN_API_KEY,
    };
    let results: ArticleInterface[] = [];

    try {
      const resp = await axios.get("https://content.guardianapis.com/search", {
        params: { ...params, q: searchQuery },
      });
      results = resp.data.response.results.map(convertGuardianResponse);
    } catch (error) {
      console.error("Error fetching Guardian data", error);
    }

    return results;
  };

  // Submit request combining and randomizing results from all sources
  const submitRequest = async () => {
    if (query.trim()) {
      dispatch(setSearchQuery(query)); // Dispatch query to Redux

      // Combine results from all sources
      let allResults: ArticleInterface[] = [];

      // Fetch results from each source
      const newsOrgResults = await searchNewsOrg(query);
      const nyTimesResults = await searchNYTimes(query);
      const guardianResults = await searchGuardian(query);

      // Combine all results
      allResults = combineResults(newsOrgResults, nyTimesResults);
      allResults = combineResults(allResults, guardianResults);

      // Randomize the order of the results
      allResults = shuffleArray(allResults);

      // Dispatch combined and shuffled results to Redux
      dispatch(setSourceFilter("all"));
      dispatch(setOriginalArticles(allResults));
      dispatch(setSearchResults(allResults));
    } else {
      // If no query, fetch and combine top headlines from NewsOrg, NYTimes, and Guardian
      const newsOrgResults = await searchNewsOrg();
      const nyTimesResults = await searchNYTimes();
      const guardianResults = await searchGuardian(); // Include Guardian results

      // Combine all results
      let allResults = combineResults(newsOrgResults, nyTimesResults);
      allResults = combineResults(allResults, guardianResults);

      // Randomize the order of the results
      allResults = shuffleArray(allResults);

      // Dispatch combined and shuffled results to Redux
      dispatch(setSourceFilter("all"));
      dispatch(setOriginalArticles(allResults));
      dispatch(setSearchResults(allResults));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitRequest();
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
