const CategorySectionSkeleton = () => (
  <div>
    {/* Skeleton for title */}
    <div className="h-8 bg-gray-300 w-3/4 mb-4"></div>

    {/* Skeleton for articles */}
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-6 bg-gray-300 w-1/2"></div>
          <div className="h-4 bg-gray-300 w-full"></div>
          <div className="h-3 bg-gray-300 w-1/4"></div>
        </div>
      ))}
    </div>
  </div>
);

export default CategorySectionSkeleton;
