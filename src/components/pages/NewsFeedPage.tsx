import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getCategoriesFromLocalStorage } from "../../utils/localStorage";
import ReadMoreLink from "../ReadMoreLink";
import SourceSeparator from "../common/SourceSeparator";
import { convertNewsOrgResponse } from "../../utils/article";
import ImageWithFallback from "../common/ImageWithFallback";

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadingRef = useRef<boolean>(false); // Flag to track if a request is in progress

  // Set to keep track of article URLs (or another unique property) for uniqueness
  const uniqueArticles = useRef<Set<string>>(new Set());
  const lastArticleRef = useRef<HTMLDivElement | null>(null); // Ref to observe the last article

  // Function to fetch articles based on category
  const fetchArticles = async (pageNumber: number) => {
    const categories = getCategoriesFromLocalStorage();

    // Create a promise for each category fetch
    const fetchPromises = categories.map((category) =>
      axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
          country: "us",
          category,
          pageSize: 10,
          page: pageNumber,
        },
      }),
    );

    try {
      setLoading(true);
      loadingRef.current = true; // Mark request as in progress

      // Wait for all category fetch promises to resolve
      const responses = await Promise.all(fetchPromises);

      // Extract articles from responses and combine them
      const allArticles = responses.flatMap((response) => response.data.articles);

      // Filter out duplicates based on URL (or any unique property like 'id')
      const newArticles = allArticles.filter((article) => {
        if (!uniqueArticles.current.has(article.url)) {
          uniqueArticles.current.add(article.url); // Mark the URL as seen
          return true;
        }
        return false; // Skip duplicates
      });

      // Randomize articles to ensure randomness each time
      const randomizedArticles = newArticles.sort(() => Math.random() - 0.5);

      // Update the state with the new articles
      setArticles((prevArticles) => [...prevArticles, ...randomizedArticles]);
      setHasMore(randomizedArticles.length > 0); // Stop infinite scroll if no more articles
    } catch (error) {
      console.error("Error fetching articles", error);
    } finally {
      setLoading(false);
      loadingRef.current = false; // Mark request as completed
    }
  };

  // Infinite Scroll Logic
  useEffect(() => {
    if (loadingRef.current || !hasMore) return; // Prevent multiple requests for the same page
    fetchArticles(page);
  }, [page]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const loadMore = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(loadMore, {
      rootMargin: "100px 0px 160px 0px", // Adjust for footer height
    });

    if (lastArticleRef.current) {
      observer.observe(lastArticleRef.current); // Observe the last article directly
    }

    return () => {
      if (lastArticleRef.current) {
        observer.unobserve(lastArticleRef.current); // Clean up observer
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((a, index) => {
          const article = convertNewsOrgResponse(a);

          return (
            <div
              key={`${article.url}-${article.publicationDate}`} // Ensuring uniqueness
              className="group overflow-hidden mb-4"
              ref={index === articles.length - 1 ? lastArticleRef : null} // Assign ref to the last article
            >
              <ImageWithFallback
                src={article.urlToImage}
                alt={article.title}
                imgClasses="w-full h-96 sm:h-72 md:h-72 object-cover group-hover:opacity-80 transition-opacity duration-300"
                iconClasses="w-full h-96 sm:h-72 md:h-72"
                iconSize={128}
              />
              <div className="py-2 border-b-1 border-gray-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-ellipsis line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-2 overflow-hidden text-ellipsis line-clamp-2">
                  {article.description}
                </p>
                <ReadMoreLink url={article.url} extraClasses="block mb-2" />
                <SourceSeparator article={article} extraClasses="mb-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center mt-4">Loading...</div>}
    </div>
  );
};

export default NewsFeed;
