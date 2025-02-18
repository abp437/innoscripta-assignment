import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "../app/store";
import { setSearchResults } from "../app/searchResultsSlice";
import NewsIcon from "./icons/NewsIcon";
import ReadMoreLink from "./ReadMoreLink";
import SearchResultsSkeleton from "./skeleton_loaders/SearchResultsSkeleton";
import ArticleInterface from "../interfaces/ArticleInterface";

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query); // Get search query from Redux
  const searchResults = useSelector((state: RootState) => state.searchResults.articles); // Get articles from Redux
  const [loading, setLoading] = useState(false); // Add a loading state

  useEffect(() => {
    // const getTopNewsOrgHeadlines = () => {
    //   axios({
    //     method: "get",
    //     url: "https://newsapi.org/v2/top-headlines?country=us",
    //     params: {
    //       sortBy: "popularity",
    //       apiKey: import.meta.env.VITE_NEWS_API_KEY,
    //     },
    //   }).then((resp) => {
    //     dispatch(setSearchResults(resp.data.articles));
    //     setLoading(false); // Set loading to false when data is fetched
    //   });
    // };
    // getTopNewsOrgHeadlines();
    // const getTopNYTimesHeadlines = () => {
    //   const params = {
    //     "api-key": import.meta.env.VITE_NEW_YORK_TIMES_API_KEY,
    //   };
    //   axios.get("https://api.nytimes.com/svc/topstories/v2/home.json", { params }).then((resp) => {
    //     const articles: ArticleInterface[] = resp.data.results.map((doc: any) => ({
    //       title: doc.title,
    //       description: doc.abstract,
    //       url: doc.url,
    //       urlToImage: doc.multimedia?.[0]?.url || "", // Fallback in case of no image
    //       source: "New York Times",
    //     }));
    //     dispatch(setSearchResults(articles));
    //   });
    // };
    // getTopNYTimesHeadlines();
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
