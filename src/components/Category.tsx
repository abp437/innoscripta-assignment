import { useState, useEffect } from "react";
import axios from "axios";
import HighlightText from "./HighlightText";
import { getCategoriesFromLocalStorage } from "../utils/localStorage"; // Import the utility function

const Category: React.FC = () => {
  // State to store articles for each category
  const [articles, setArticles] = useState<{ [key: string]: any[] }>({});
  // State to store loading status for each category
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  // State to store error messages for each category
  const [error, setError] = useState<{ [key: string]: string }>({});
  // State to store categories from localStorage
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch articles for a given category
  const fetchArticles = async (category: string) => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
          country: "us",
          category,
          pageSize: 5,
          page: 1,
        },
      });
      setArticles((prevArticles) => ({
        ...prevArticles,
        [category]: response.data.articles,
      }));
      setLoading((prevLoading) => ({
        ...prevLoading,
        [category]: false,
      }));
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        [category]: `Failed to load ${category} articles. Please try again later.`,
      }));
      setLoading((prevLoading) => ({
        ...prevLoading,
        [category]: false,
      }));
    }
  };

  // Function to sequentially fetch articles for each category with a delay
  const fetchAllArticles = async () => {
    for (const category of categories) {
      await fetchArticles(category); // Fetch articles for the category
    }
  };

  // Fetch categories from localStorage and update state
  useEffect(() => {
    const storedCategories = getCategoriesFromLocalStorage();
    if (storedCategories.length > 0) {
      setCategories(storedCategories);
    }
  }, []);

  // Fetch articles for all categories on component mount
  useEffect(() => {
    if (categories.length > 0) {
      // Reset state before fetching articles
      setArticles({});
      setLoading(categories.reduce((acc, category) => ({ ...acc, [category]: true }), {}));
      setError(categories.reduce((acc, category) => ({ ...acc, [category]: "" }), {}));

      fetchAllArticles();
    }
  }, [categories]); // Re-fetch articles when categories change

  if (categories.length === 0) {
    return (
      <div className="border-t-2 bg-white">
        <div className="container mx-auto px-4 pt-16 pb-6">
          <p className="text-red-500 text-center">No categories found in user preferences.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t-2 bg-white">
      <div className="container mx-auto px-4 pt-16 pb-6">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <div key={category} className="mb-10">
              <h2 className="text-3xl lora-bold text-gray-800 mb-8">
                <HighlightText>{category.charAt(0).toUpperCase() + category.slice(1)}</HighlightText>
              </h2>

              {/* Skeleton loader or articles */}
              {loading[category] ? (
                <div>
                  {/* Skeleton for title */}
                  <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>

                  {/* Skeleton for articles */}
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="space-y-3">
                        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : error[category] ? (
                <div className="text-red-500 text-sm">{error[category]}</div> // Show error message
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {articles[category]?.map((article, index) => (
                    <div key={index} className="text-gray-800 border-b-1 pb-4 border-gray-300">
                      <h3 className="lora-bold text-lg">{article.headline}</h3>
                      <p className="text-gray-600 text-sm mb-2 overflow-hidden text-ellipsis line-clamp-2">
                        {article.description}
                      </p>
                      <a href={article.link} className="text-sm font-medium" target="_blank" rel="noopener noreferrer">
                        <HighlightText>Read more</HighlightText>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
