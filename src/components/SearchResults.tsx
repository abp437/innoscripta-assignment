import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "../app/store";
import HighlightText from "./HighlightText";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: string;
}

const SearchResults: React.FC = () => {
  const searchQuery = useSelector((state: RootState) => state.search.query); // Get search query from Redux
  const [searchResults, setSearchResults] = useState<Article[]>([]); // Use Article[] for proper typing

  const getTopHeadlines = () => {
    axios({
      method: "get",
      url: "https://newsapi.org/v2/top-headlines?country=us",
      params: {
        sortBy: "popularity",
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
      },
    }).then((resp) => {
      setSearchResults(resp.data.articles); // Type the response correctly
    });
  };

  // Filter articles based on the search query
  const filteredArticles = searchResults.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    getTopHeadlines();
  }, []);

  if (filteredArticles.length === 0) {
    return <p className="text-center py-4">No articles found for "{searchQuery}"</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      {filteredArticles.map((article) => (
        <div key={article.url} className="border-b-1 p-4 mb-4 border-gray-300">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
            <img
              className="w-full h-48 md:w-24 md:h-24 object-cover rounded-md group-hover:opacity-80"
              src={article.urlToImage}
              alt={article.title}
            />
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-semibold">{article.title}</h3>
              <p className="text-lg">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <HighlightText>Read more</HighlightText>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
