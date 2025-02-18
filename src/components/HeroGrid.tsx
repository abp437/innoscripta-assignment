import { useState, useEffect } from "react";
import axios from "axios";
import HighlightText from "./HighlightText";
import ReadMoreLink from "./ReadMoreLink";
import HeroMainSkeleton from "./skeleton_loaders/HeroMainSkeleton";
import HeroSubSectionSkeleton from "./skeleton_loaders/HeroSubSectionSkeleton";
import ArticleInterface from "../interfaces/ArticleInterface";
import SourceSeparator from "./common/SourceSeparator";
import { convertNewsOrgResponse } from "../utils/article";

const HeroGrid: React.FC = () => {
  // Manage the state with the correct Article type
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<ArticleInterface[]>([]);
  const [latestUpdates, setLatestUpdates] = useState<ArticleInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Async function to get top headlines
    const getTopHeadlines = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            sortBy: "popularity",
            country: "us",
            apiKey: import.meta.env.VITE_NEWS_API_KEY,
          },
        });

        const topHeadlines: ArticleInterface[] = response.data.articles;

        // Get the first two articles that have a valid urlToImage
        const hero = topHeadlines.filter((article) => article.urlToImage).slice(0, 2);

        // Get the next three articles for trending and the remaining for latest updates
        const trending = topHeadlines.slice(2, 5);
        const latest = topHeadlines.slice(5, 8);

        setArticles(hero);
        setTrendingArticles(trending);
        setLatestUpdates(latest);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (err) {
        setError("Failed to fetch news articles. Please try again later.");
        console.error(err);
        setIsLoading(false); // Set loading state to false if there is an error
      }
    };

    getTopHeadlines();
  }, []);

  // If there's an error, show it
  if (error) {
    return <div className="text-center my-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Grid with 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column (Main Content + Trending News) */}
        <div className="lg:col-span-3 pr-0 md:pr-4 pb-8 lg:pb-0">
          {/* Main Content (First two articles) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 border-b-1 border-gray-300">
            {isLoading
              ? Array(2)
                  .fill(0)
                  .map((_, index) => <HeroMainSkeleton key={index} />)
              : articles
                  .filter((article) => article.urlToImage)
                  .map((a) => {
                    const article = convertNewsOrgResponse(a);
                    const { url, urlToImage, title, description } = article;

                    return (
                      <div key={url} className="group overflow-hidden">
                        <img
                          className="w-full h-96 sm:h-72 md:h-72 object-cover group-hover:opacity-80"
                          src={urlToImage}
                          alt={title}
                        />
                        <div className="pb-6 pt-2">
                          <h3 className="text-2xl lora-bold text-gray-800 mb-2 text-ellipsis line-clamp-2">{title}</h3>
                          <p className="text-gray-600 text-sm mb-2 overflow-hidden text-ellipsis line-clamp-2">
                            {description}
                          </p>
                          <ReadMoreLink url={url} extraClasses="block mb-2" />
                          <SourceSeparator article={article} />
                        </div>
                      </div>
                    );
                  })}
          </div>
        </div>

        {/* Right Sidebar (Latest Updates) */}
        <div className="lg:col-span-1 pl-0 md:pl-4 pb-8 lg:pb-0">
          <h2 className="text-xl lora-bold mb-4">
            <HighlightText>Latest Updates</HighlightText>
          </h2>
          <div className="space-y-4">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <HeroSubSectionSkeleton key={index} />)
              : latestUpdates.map((a) => {
                  const article = convertNewsOrgResponse(a);
                  const { url, title, description } = article;

                  return (
                    <div key={url} className="group overflow-hidden">
                      <div className="border-b-1 border-gray-300">
                        <h3 className="text-lg lora-bold text-gray-800 mb-2 text-ellipsis line-clamp-2">{title}</h3>
                        <p className="text-sm text-gray-600 mb-2 overflow-hidden text-ellipsis line-clamp-2">
                          {description}
                        </p>
                        <ReadMoreLink url={url} extraClasses="block mb-2" />
                        <SourceSeparator article={article} extraClasses="mb-4" />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      {/* Trending News */}
      <h2 className="text-xl lora-bold mb-4">
        <HighlightText>Trending</HighlightText>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => <HeroSubSectionSkeleton key={index} />)
          : trendingArticles.map((a) => {
              const article = convertNewsOrgResponse(a);
              const { url, title, description } = article;

              return (
                <div key={url} className="group overflow-hidden">
                  <h3 className="text-lg lora-bold text-gray-800 mb-2 text-ellipsis line-clamp-2">{title}</h3>
                  <p className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-2 mb-2">{description}</p>
                  <ReadMoreLink url={url} extraClasses="block mb-2" />
                  <SourceSeparator article={article} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default HeroGrid;
