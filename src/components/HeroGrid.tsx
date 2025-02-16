import React from "react";

const articles = [
  {
    id: 1,
    title: "Breaking News: Something Happened",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
    imageUrl:
      "https://static01.nyt.com/images/2025/02/16/multimedia/15xp-flooding/16wea-storm-threeByTwoMediumAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale",
    category: "World",
  },
  {
    id: 2,
    title: "Technology: The Rise of AI",
    description: "Vestibulum auctor dapibus neque. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.",
    imageUrl:
      "https://static01.nyt.com/images/2025/02/11/multimedia/00easttimor-01-jgcw/00easttimor-01-jgcw-threeByTwoMediumAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale",
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
      {/* Grid with 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column (Main Content + Trending News) */}
        <div className="lg:col-span-3 pr-0 md:pr-4 pb-8 lg:pb-0">
          {/* Main Content (First two articles) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 border-b-1">
            {articles.slice(0, 2).map((article) => (
              <div key={article.id} className="group overflow-hidden">
                <img
                  className="w-full h-96 sm:h-72 md:h-72 object-cover group-hover:opacity-80"
                  src={article.imageUrl}
                  alt={article.title}
                />
                <div className="pb-6 pt-2">
                  <h3 className="text-2xl lora-bold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 overflow-hidden text-ellipsis line-clamp-2">
                    {article.description}
                  </p>
                  <span className="text-sm font-medium text-gray-500">{article.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (Latest Updates) */}
        <div className="lg:col-span-1 pl-0 md:pl-4 pb-8 lg:pb-0">
          <h2 className="text-xl lora-bold mb-4">
            <span className="border-b-2">Latest Updates &gt;</span>
          </h2>
          <div className="space-y-4">
            {latestUpdates.map((update) => (
              <div key={update.id} className="group overflow-hidden">
                <div className="border-b-1">
                  <h3 className="text-lg lora-bold text-gray-800 mb-2">{update.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 overflow-hidden text-ellipsis line-clamp-2">
                    {update.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Trending News */}
      <h2 className="text-xl lora-bold mb-4">
        <span className="border-b-2">Trending &gt;</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingArticles.map((article) => (
          <div key={article.id} className="group overflow-hidden">
            <div className="">
              <h3 className="text-lg lora-bold text-gray-800 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-2">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroGrid;
