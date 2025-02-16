import React from "react";

// Dummy Data for Categories
const categories = [
  {
    id: 1,
    name: "World",
    headline: "Global Conflict Escalates Amid Tensions",
    description:
      "Tensions rise in global political climate. Experts debate on potential outcomes as world leaders weigh in.",
    imageUrl: "https://placehold.co/600x400",
    link: "#",
  },
  {
    id: 2,
    name: "Politics",
    headline: "New Political Reforms Shake the Nation",
    description:
      "The government has introduced new reforms aimed at revitalizing the economy and improving public services.",
    imageUrl: "https://placehold.co/400x600",
    link: "#",
  },
  {
    id: 3,
    name: "Technology",
    headline: "AI Innovations That Could Change Our Future",
    description:
      "Artificial Intelligence continues to grow at a rapid pace. Here’s a look at the latest developments in AI technology.",
    imageUrl: "https://placehold.co/600x400",
    link: "#",
  },
  {
    id: 4,
    name: "Business",
    headline: "Stock Market Soars Amid Economic Growth",
    description:
      "The stock market has reached record highs following signs of economic growth, with analysts predicting further rise in the near future.",
    imageUrl: "https://placehold.co/600x400",
    link: "#",
  },
  {
    id: 5,
    name: "Sports",
    headline: "Championship Final: A Thrilling Victory",
    description:
      "The championship final left fans on the edge of their seats as the underdogs secured a dramatic victory.",
    imageUrl: "https://placehold.co/600x400",
    link: "#",
  },
  {
    id: 6,
    name: "Entertainment",
    headline: "Hollywood’s Latest Blockbuster Breaks Records",
    description:
      "The latest movie has become an instant hit, breaking box office records and receiving rave reviews from critics and fans alike.",
    imageUrl: "https://placehold.co/400x600",
    link: "#",
  },
  {
    id: 7,
    name: "Health",
    headline: "New Medical Breakthroughs in Cancer Treatment",
    description:
      "Groundbreaking research is giving hope to patients, with new treatments showing incredible potential for cancer remission.",
    imageUrl: "https://placehold.co/600x400",
    link: "#",
  },
  {
    id: 8,
    name: "Science",
    headline: "Space Exploration Reaches New Heights",
    description:
      "The latest space missions are setting new records for humanity’s exploration of space, including the first private-funded moon landing.",
    imageUrl: "https://placehold.co/600x400",
    link: "#",
  },
  {
    id: 9,
    name: "Travel",
    headline: "Top 10 Destinations to Visit This Year",
    description:
      "From exotic islands to cultural cities, here are the top travel destinations for 2025 that every traveler should consider.",
    imageUrl: "https://placehold.co/600x400",
    link: "#",
  },
  {
    id: 10,
    name: "Lifestyle",
    headline: "10 Habits That Will Improve Your Daily Life",
    description: "Small lifestyle changes that can make a big difference in your physical and mental health over time.",
    imageUrl: "https://placehold.co/400x600",
    link: "#",
  },
];

const NewsFeed: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">News Feed with infinite Scroll</h1>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`group bg-white shadow-lg overflow-hidden transition-shadow duration-300 ${category.id % 2 === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
          >
            {/* Article Image */}
            <img
              src={category.imageUrl}
              alt={category.headline}
              className="w-full h-48 sm:h-64 object-cover group-hover:opacity-80 transition-opacity duration-300"
            />

            <div className="p-6">
              {/* Category Title */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{category.headline}</h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>

              {/* Read More Link */}
              <a href={category.link} className="text-blue-600 text-sm font-medium hover:underline">
                Read more &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
