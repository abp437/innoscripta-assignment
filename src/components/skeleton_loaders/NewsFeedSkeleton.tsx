const NewsFeedSkeleton = () => (
  <div className="group overflow-hidden mb-4 animate-pulse">
    <div className="w-full h-72 bg-gray-300"></div>
    <div className="py-2 border-b-1 border-gray-300">
      <div className="h-6 bg-gray-300 mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 mb-2 w-5/6"></div>
      <div className="h-4 bg-gray-300 mb-4 w-1/3"></div>
    </div>
  </div>
);

export default NewsFeedSkeleton;
