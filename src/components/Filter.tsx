import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setSearchResults } from "../app/searchResultsSlice";
import { setSourceFilter, setCategoryFilter, setOrderByFilter } from "../app/filtersSlice";

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const originalArticles = useSelector((state: RootState) => state.searchResults.originalArticles);
  const { sourceFilter, category, orderBy } = useSelector((state: RootState) => state.filters);

  // Filter articles by source
  const filterBySource = (source: string) => {
    if (source === "all") {
      // Revert to the original articles when 'All Sources' is selected
      dispatch(setSearchResults(originalArticles));
    } else {
      // Filter articles based on the selected source
      const filteredArticles = originalArticles.filter((article) => article.source === source);
      dispatch(setSearchResults(filteredArticles));
    }
  };

  return (
    <div className="flex justify-center space-x-4 py-4">
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
    </div>
  );
};

export default Filter;
