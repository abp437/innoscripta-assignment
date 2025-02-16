import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../app/searchSlice"; // You need to create this slice for search query.

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    dispatch(setSearchQuery(event.target.value)); // Dispatch the query to Redux store.
  };

  return (
    <div className="flex justify-center py-4">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search news..."
        className="px-4 py-2 border border-gray-300 rounded-md w-1/2"
      />
    </div>
  );
};

export default SearchBar;
