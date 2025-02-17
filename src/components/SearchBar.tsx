import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../app/searchSlice";
import SearchIcon from "./icons/SearchIcon";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="flex justify-center py-4">
      <div className="relative w-full mx-4 md:w-1/2">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search news, topics & more..."
          className="w-full pl-4 pr-8 py-2 border-1"
        />
        <SearchIcon extraClasses="absolute top-2 right-2" />
      </div>
    </div>
  );
};

export default SearchBar;
