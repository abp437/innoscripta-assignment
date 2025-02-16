import React from "react";

const Filter: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4 py-4">
      <select className="border border-gray-300 px-4 py-2">
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="popularity">Most Popular</option>
      </select>
      <select className="border border-gray-300 px-4 py-2">
        <option value="all">All Categories</option>
        <option value="tech">Tech</option>
        <option value="sports">Sports</option>
        <option value="politics">Politics</option>
      </select>
    </div>
  );
};

export default Filter;
