import { memo, useMemo } from "react";
import { ArticleCard } from "./ArticleCard";
import {
  useGetNewsApiArticlesQuery,
  useGetNYTimesArticlesQuery,
  useGetGuardianArticlesQuery,
} from "../features/api/apiSlice";

export const ArticlesList = memo(() => {
  const {
    data: newsApiArticles = [],
    isLoading: isLoadingNews,
    error: newsError,
    isError: isNewsError,
  } = useGetNewsApiArticlesQuery();

  const {
    data: nyTimesArticles = [],
    isLoading: isLoadingNYT,
    error: nytError,
    isError: isNYTError,
  } = useGetNYTimesArticlesQuery();

  const {
    data: guardianArticles = [],
    isLoading: isLoadingGuardian,
    error: guardianError,
    isError: isGuardianError,
  } = useGetGuardianArticlesQuery();

  const isLoading = isLoadingNews || isLoadingNYT || isLoadingGuardian;

  // Combine all articles and memoize the result
  const allArticles = useMemo(() => {
    const articles = [
      ...(newsApiArticles || []).map((article) => ({
        ...article,
        source: { name: article.source?.name || "News API" },
      })),
      ...(nyTimesArticles || []).map((article) => ({
        ...article,
        source: { name: "New York Times" },
      })),
      ...(guardianArticles || []).map((article) => ({
        ...article,
        source: { name: "The Guardian" },
      })),
    ];

    // Optional: Sort articles by source for better organization
    return articles.sort((a, b) => a.source.name.localeCompare(b.source.name));
  }, [newsApiArticles, nyTimesArticles, guardianArticles]);

  // Show loading state if any source is still loading
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show partial errors if any source fails
  const errors = [];
  if (isNewsError) errors.push(`News API: ${newsError?.data?.message || "Failed to load"}`);
  if (isNYTError) errors.push(`NYT: ${nytError?.data?.message || "Failed to load"}`);
  if (isGuardianError) errors.push(`Guardian: ${guardianError?.data?.message || "Failed to load"}`);

  // If all sources failed, show full error
  if (errors.length === 3) {
    return (
      <div className="text-red-500 text-center py-4">
        <h2 className="text-xl font-bold mb-2">Error Loading Articles</h2>
        <ul className="list-disc list-inside">
          {errors.map((error, index) => (
            <li key={index} className="text-sm">
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Show articles with source-based grouping
  return (
    <div className="max-w-4xl mx-auto px-4">
      {errors.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Some news sources failed to load:</p>
              <ul className="list-disc list-inside mt-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-xs text-yellow-600">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Group articles by source */}
      {Object.entries(
        allArticles.reduce(
          (acc, article) => {
            const source = article.source.name;
            if (!acc[source]) acc[source] = [];
            acc[source].push(article);
            return acc;
          },
          {} as Record<string, typeof allArticles>,
        ),
      ).map(([source, articles]) => (
        <div key={source} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{source}</h2>
          <div className="space-y-4">
            {articles.map((article, index) => (
              <ArticleCard key={`${source}-${index}`} article={article} />
            ))}
          </div>
        </div>
      ))}

      {allArticles.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">No articles available at the moment</div>
      )}
    </div>
  );
});

ArticlesList.displayName = "ArticlesList";
