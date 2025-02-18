import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "../app/store";
import { setSearchResults } from "../app/searchResultsSlice";
import NewsIcon from "./icons/NewsIcon";
import ReadMoreLink from "./ReadMoreLink";
import SearchResultsSkeleton from "./skeleton_loaders/SearchResultsSkeleton";
import ArticleInterface from "../interfaces/ArticleInterface";
import { shuffleArray } from "../utils/array";
import { convertNYTimesResponse, convertNewsOrgResponse, convertGuardianResponse } from "../utils/article";

const combineResults = (articles: ArticleInterface[], newArticles: ArticleInterface[]) => {
  return [...articles, ...newArticles];
};

const getNewsOrgHeadlines = async () => {
  const params = {
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
    sortBy: "popularity",
  };
  let results: ArticleInterface[] = [];

  try {
    const resp = await axios.get("https://newsapi.org/v2/top-headlines?country=us", { params });
    results = resp.data.articles.map(convertNewsOrgResponse); // Assume convertNewsOrgResponse maps the data correctly
  } catch (error) {
    console.error("Error fetching NewsOrg data", error);
  }

  return results;
};

const getNyTimesHeadlines = async () => {
  const params = {
    "api-key": import.meta.env.VITE_NEW_YORK_TIMES_API_KEY,
  };
  let results: ArticleInterface[] = [];

  try {
    const resp = await axios.get("https://api.nytimes.com/svc/topstories/v2/home.json", { params });
    results = resp.data.results.map(convertNYTimesResponse); // Assume convertNYTimesResponse maps the data correctly
  } catch (error) {
    console.error("Error fetching NYTimes data", error);
  }

  return results;
};

const getGuardianHeadlines = async () => {
  const params = {
    "api-key": import.meta.env.VITE_THE_GUARDIAN_API_KEY,
  };
  let results: ArticleInterface[] = [];

  try {
    const resp = await axios.get("https://content.guardianapis.com/search", { params });
    results = resp.data.response.results.map(convertGuardianResponse); // Assume convertGuardianResponse maps the data correctly
  } catch (error) {
    console.error("Error fetching Guardian data", error);
  }

  return results;
};

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const searchResults = useSelector((state: RootState) => state.searchResults.articles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to submit request, combine results, and shuffle them
    const submitRequest = async () => {
      setLoading(true); // Set loading to true when fetching starts

      const newsOrgResults = await getNewsOrgHeadlines();
      const nyTimesResults = await getNyTimesHeadlines();
      const guardianResults = await getGuardianHeadlines();

      // Combine all results
      let allResults = combineResults(newsOrgResults, nyTimesResults);
      allResults = combineResults(allResults, guardianResults);

      // Randomize the order of the results
      allResults = shuffleArray(allResults);

      // Dispatch combined and shuffled results to Redux
      dispatch(setSearchResults(allResults));
      setLoading(false);
    };

    submitRequest();
  }, [dispatch]);

  if (loading) {
    // Render skeleton loader while loading
    return (
      <div className="container mx-auto px-4 py-6 space-y-4">
        {[...Array(5)].map((_, index) => (
          <SearchResultsSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (searchResults.length === 0) {
    return <p className="text-center py-4">No articles found for "{searchQuery}"</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      {searchResults.map((article: ArticleInterface) => (
        <div key={article.url} className="border-b-1 p-4 mb-4 border-gray-300">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
            {article.urlToImage ? (
              <img
                className="w-full h-48 md:w-24 md:h-24 object-cover group-hover:opacity-80"
                src={article.urlToImage}
                alt={article.title}
              />
            ) : (
              <div className="w-full h-48 md:w-24 md:h-24 object-cover group-hover:opacity-80 flex justify-center items-center border-1">
                <NewsIcon width={50} height={50} />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-semibold">{article.title}</h3>
              <p className="text-md mb-4">{article.description}</p>
              <ReadMoreLink url={article.url} extraClasses="block mb-4" />
              <span className="roboto-bold text-sm text-gray-400">{`Source: ${article.source}`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
