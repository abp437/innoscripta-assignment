import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setSearchResults } from "../app/searchResultsSlice";
import { setSourceFilter, setOrderByFilter } from "../app/filtersSlice";
import { sortSearchResults } from "../utils/array";
import { NYT, GUARDIAN, NEWS_ORG } from "../utils/constants";

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const originalArticles = useSelector((state: RootState) => state.searchResults.originalArticles);
  const { sourceFilter, orderByFilter } = useSelector((state: RootState) => state.filters);

  const filterArticles = () => {
    let filteredArticles = [...originalArticles];

    // Apply source filter
    if (sourceFilter !== "all") {
      filteredArticles = filteredArticles.filter((article) => article.source === sourceFilter);
    }

    // Sort the filtered articles by the selected order
    filteredArticles = sortSearchResults(orderByFilter, filteredArticles);

    // Dispatch the filtered and sorted articles
    dispatch(setSearchResults(filteredArticles));
  };

  const handleSourceChange = (source: string) => {
    dispatch(setSourceFilter(source));
    filterArticles();
  };

  const handleOrderChange = (order: string) => {
    dispatch(setOrderByFilter(order as "asc" | "desc")); // Explicit cast here
    filterArticles();
  };

  return (
    <div className="flex justify-center space-x-4 py-4">
      <select
        className="border border-gray-300 px-4 py-2"
        value={orderByFilter}
        onChange={(e) => handleOrderChange(e.target.value)}
      >
        <option value="desc">Latest</option>
        <option value="asc">Oldest</option>
      </select>
      <select
        className="border border-gray-300 px-4 py-2"
        value={sourceFilter}
        onChange={(e) => handleSourceChange(e.target.value)}
      >
        <option value="all">All Sources</option>
        <option value={NYT}>{NYT}</option>
        <option value={GUARDIAN}>{GUARDIAN}</option>
        <option value={NEWS_ORG}>{NEWS_ORG}</option>
      </select>
    </div>
  );
};

export default Filter;
