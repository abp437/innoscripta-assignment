import React from "react";

const articles = [
  {
    id: 1,
    title: "Breaking News: Something Happened",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
    imageUrl: "https://placehold.co/600x400",
    category: "World",
  },
  {
    id: 2,
    title: "Technology: The Rise of AI",
    description: "Vestibulum auctor dapibus neque. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.",
    imageUrl: "https://placehold.co/600x400",
    category: "Technology",
  },
  {
    id: 3,
    title: "Sports: Latest Football Highlights",
    description: "Sed fringilla mauris sit amet nibh. Duis ac turpis. Integer rutrum ante eu lacus.",
    imageUrl: "https://placehold.co/600x400",
    category: "Sports",
  },
  {
    id: 4,
    title: "Opinion: The Future of Politics",
    description: "In quis leo et eros tempus congue. Fusce ut est quis enim consectetur tincidunt.",
    imageUrl: "https://placehold.co/600x400",
    category: "Opinion",
  },
  {
    id: 5,
    title: "Health: New Discoveries in Medicine",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
    imageUrl: "https://placehold.co/600x400",
    category: "Health",
  },
];

const trendingArticles = [
  { id: 1, title: "Breaking News: AI Taking Over?", description: "AI technology advancements taking over industries." },
  { id: 2, title: "Sports: A New Football Champion", description: "The latest football championship results." },
  {
    id: 3,
    title: "World: Global Warming Action Needed",
    description: "Global warming requires urgent attention and action.",
  },
];

const latestUpdates = [
  {
    id: 1,
    title: "Tech: New Smartphone Released",
    description: "The latest smartphone is now available with cutting-edge features.",
  },
  { id: 2, title: "Health: Vaccine Update", description: "A new vaccine has been approved for widespread use." },
  {
    id: 3,
    title: "Politics: Government Shutdown Expected",
    description: "Government shutdown concerns affecting national security.",
  },
];

const HeroGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Four columns for large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar (Trending) */}
        <div className="lg:col-span-1 border-b lg:border-b-0 border-gray-300 pr-4 pb-8 lg:pb-0">
          <h2 className="text-xl font-semibold mb-4">Trending</h2>
          <div className="space-y-4">
            {trendingArticles.map((article) => (
              <div key={article.id}>
                <h3 className="font-semibold text-lg text-gray-900">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 border-b lg:border-b-0 border-gray-300 pr-4 pb-8 lg:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <img className="w-full h-auto rounded-lg mb-4" src={article.imageUrl} alt={article.title} />
                <span className="text-sm font-medium text-gray-500">{article.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (Latest Updates) */}
        <div className="lg:col-span-1 pl-4 border-b lg:border-b-0 pb-8 lg:pb-0">
          <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>
          <div className="space-y-4">
            {latestUpdates.map((update) => (
              <div key={update.id}>
                <h3 className="font-semibold text-lg text-gray-900">{update.title}</h3>
                <p className="text-sm text-gray-600">{update.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
