const SearchResultsSkeleton = () => (
  <div className="border-b-1 p-4 mb-4 border-gray-300 animate-pulse">
    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
      <div className="w-full h-48 md:w-24 md:h-24 bg-gray-300"></div>
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-gray-300 w-3/4"></div>
        <div className="h-4 bg-gray-300 w-1/2"></div>
        <div className="h-4 bg-gray-300 w-1/3"></div>
      </div>
    </div>
  </div>
);

export default SearchResultsSkeleton;
