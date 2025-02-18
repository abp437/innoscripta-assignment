import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getCategoriesFromLocalStorage } from "../utils/localStorage";
import ReadMoreLink from "./ReadMoreLink";

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<boolean>(false); // Flag to track if a request is in progress

  // Set to keep track of article URLs (or another unique property) for uniqueness
  const uniqueArticles = useRef<Set<string>>(new Set());

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

    observer.current = new IntersectionObserver(loadMore, {
      rootMargin: "100px 0px 90px 0px", // Adjust for footer height
    });

    const lastArticle = document.querySelector("#last-article");
    if (lastArticle) {
      observer.current.observe(lastArticle);
    }

    return () => {
      if (observer.current && lastArticle) {
        observer.current.unobserve(lastArticle);
      }
    };
  }, [loading, hasMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <div
            key={`${article.url}-${article.publishedAt}`} // Combining URL and published date to ensure uniqueness
            className={`group bg-white shadow-lg overflow-hidden transition-shadow duration-300 ${index % 2 === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            id={index === articles.length - 1 ? "last-article" : ""}
          >
            {/* Article Image */}
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 sm:h-64 object-cover group-hover:opacity-80 transition-opacity duration-300"
            />

            <div className="p-6">
              {/* Category Title */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{article.description}</p>
              <ReadMoreLink url={article.url} />
            </div>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center mt-4">Loading...</div>}
    </div>
  );
};

export default NewsFeed;
