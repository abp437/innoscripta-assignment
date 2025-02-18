import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setSearchResults } from "../app/searchResultsSlice";
import { setSourceFilter, setCategoryFilter, setOrderByFilter } from "../app/filtersSlice";
import ArticleInterface from "../interfaces/ArticleInterface";

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const originalArticles = useSelector((state: RootState) => state.searchResults.originalArticles);
  const searchResults = useSelector((state: RootState) => state.searchResults.articles);
  const { sourceFilter, categoryFilter, orderByFilter } = useSelector((state: RootState) => state.filters);

  const filterBySource = (source: string) => {
    if (source === "all") {
      // Revert to the original articles when 'All Sources' is selected
      dispatch(setSearchResults(originalArticles));
    } else {
      // Filter articles based on the selected source
      const filteredArticles = searchResults.filter((article) => article.source === source);
      dispatch(setSearchResults(filteredArticles));
    }
  };

  const filterByCategory = (category: string) => {
    if (category === "all") {
      // Revert to the original articles when 'All Categories' is selected
      dispatch(setSearchResults(originalArticles));
    } else {
      // Filter articles based on the selected source
      const filteredArticles = originalArticles.filter((article) => article.source === category);
      dispatch(setSearchResults(filteredArticles));
    }
  };

  const sortByOrder = (order: string) => {
    let sortedArticles: ArticleInterface[] = [...searchResults];

    if (order === "desc") {
      // Sort articles by publicationDate in descending order (latest first)
      sortedArticles = sortedArticles.sort((a, b) => {
        return b.publicationDate.localeCompare(a.publicationDate);
      });
    } else if (order === "asc") {
      // Sort articles by publicationDate in ascending order (oldest first)
      sortedArticles = sortedArticles.sort((a, b) => {
        return a.publicationDate.localeCompare(b.publicationDate);
      });
    }

    dispatch(setSearchResults(sortedArticles));
  };

  return (
    <div className="flex justify-center space-x-4 py-4">
      <select
        className="border border-gray-300 px-4 py-2"
        value={orderByFilter}
        onChange={(e) => {
          dispatch(setOrderByFilter(e.target.value as "asc" | "desc")); // Explicit cast here
          sortByOrder(e.target.value);
        }}
      >
        <option value="desc">Latest</option>
        <option value="asc">Oldest</option>
      </select>
      <select
        className="border border-gray-300 px-4 py-2"
        value={sourceFilter}
        onChange={(e) => {
          dispatch(setSourceFilter(e.target.value));
          filterBySource(e.target.value);
        }}
      >
        <option value="all">All Sources</option>
        <option value="The New York Times">The New York Times</option>
        <option value="The Guardian">The Guardian</option>
        <option value="News Org">News Org</option>
      </select>
      <select
        className="border border-gray-300 px-4 py-2"
        value={categoryFilter}
        onChange={(e) => {
          dispatch(setCategoryFilter(e.target.value));
          filterByCategory(e.target.value);
        }}
      >
        <option value="all">All Categories</option>
        <option value="The New York Times">The New York Times</option>
        <option value="The Guardian">The Guardian</option>
        <option value="News Org">News Org</option>
      </select>
    </div>
  );
};

export default Filter;
