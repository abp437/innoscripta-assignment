import { useState, useEffect } from "react";
import axios from "axios";
import HighlightText from "./HighlightText";
import { getCategoriesFromLocalStorage } from "../utils/localStorage";
import NewsIcon from "./icons/NewsIcon";
import ReadMoreLink from "./ReadMoreLink";
import CategorySectionSkeleton from "./skeleton_loaders/CategorySectionSkeleton";
import SourceSeparator from "./common/SourceSeparator";
import { convertNewsOrgResponse } from "../utils/article";

const Category: React.FC = () => {
  const [articles, setArticles] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});
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
          page: category === "general" ? 2 : 1,
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
                <CategorySectionSkeleton />
              ) : error[category] ? (
                <div className="text-red-500 text-sm">{error[category]}</div> // Show error message
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {articles[category]?.map((a, i) => {
                    const article = convertNewsOrgResponse(a);

                    return (
                      <div key={article.url} className="text-gray-800 border-b-1 pb-4 border-gray-300">
                        {/* Check if it's the first article */}
                        {i === 0 && (
                          <>
                            {article.urlToImage ? (
                              <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-56 sm:h-72 md:h-48 lg:h-36 object-cover group-hover:opacity-80 transition-opacity duration-300 mb-2"
                              />
                            ) : (
                              <div className="w-full h-56 sm:h-72 md:h-48 lg:h-36 object-cover group-hover:opacity-80 flex justify-center items-center border-1 mb-2">
                                <NewsIcon width={50} height={50} />
                              </div>
                            )}
                          </>
                        )}
                        <h3 className="lora-bold text-lg">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-2 overflow-hidden text-ellipsis line-clamp-2">
                          {article.description}
                        </p>
                        <ReadMoreLink url={article.url} extraClasses="block text-sm mb-2" />
                        <SourceSeparator article={article} />
                      </div>
                    );
                  })}
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
