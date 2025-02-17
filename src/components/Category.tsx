import { useState } from "react";
import HighlightText from "./HighlightText";

// Dummy Data for Categories with Grouped Articles
const categories = [
  {
    id: 1,
    name: "World",
    articles: [
      {
        headline: "Global Conflict Escalates Amid Tensions",
        description:
          "Tensions rise in global political climate. Experts debate on potential outcomes as world leaders weigh in.",
        imageUrl: "https://ichef.bbci.co.uk/news/800/cpsprodpb/9d3a/live/8369ac70-eb4b-11ef-a319-fb4e7360c4ec.jpg.webp",
        link: "#",
      },
      {
        headline: "World Leaders Discuss Economic Solutions",
        description:
          "World leaders are meeting to discuss economic reforms to stabilize the global economy amid crises.",
        imageUrl: "https://placehold.co/400x600",
        link: "#",
      },
    ],
  },
  {
    id: 2,
    name: "Politics",
    articles: [
      {
        headline: "New Political Reforms Shake the Nation",
        description:
          "The government has introduced new reforms aimed at revitalizing the economy and improving public services.",
        imageUrl: "https://placehold.co/600x400",
        link: "#",
      },
      {
        headline: "Election Results to Reshape the Nation",
        description: "A close election results in a major shift in national policies and governance.",
        imageUrl: "https://placehold.co/600x400",
        link: "#",
      },
    ],
  },
  {
    id: 3,
    name: "Technology",
    articles: [
      {
        headline: "AI Innovations That Could Change Our Future",
        description:
          "Artificial Intelligence continues to grow at a rapid pace. Here’s a look at the latest developments in AI technology.",
        imageUrl: "https://placehold.co/600x400",
        link: "#",
      },
      {
        headline: "Tech Giants Reveal New Innovations",
        description: "Tech companies have released new groundbreaking gadgets, making waves in the industry.",
        imageUrl: "https://placehold.co/600x400",
        link: "#",
      },
    ],
  },
  {
    id: 4,
    name: "Sports",
    articles: [
      {
        headline: "Championship Final: A Thrilling Victory",
        description:
          "The championship final left fans on the edge of their seats as the underdogs secured a dramatic victory.",
        imageUrl: "https://placehold.co/600x400",
        link: "#",
      },
      {
        headline: "Olympics: New Records Broken",
        description: "Athletes from around the world break new records in the most exciting Olympics in history.",
        imageUrl: "https://placehold.co/600x400",
        link: "#",
      },
    ],
  },
];

const Category: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3, 4]);

  // Fill the columns to ensure each has at least 4 articles
  const getArticlesForColumn = (category: any) => {
    const minimumArticles = 4;
    const filledArticles = [...category.articles];

    while (filledArticles.length < minimumArticles) {
      filledArticles.push({
        headline: "Placeholder Article",
        description: "This is a placeholder article to ensure the column has enough content.",
        imageUrl: "https://placehold.co/600x400",
        link: "#",
      });
    }

    return filledArticles;
  };

  return (
    <div className="border-t-2 bg-white">
      <div className="container mx-auto px-4 pt-16 pb-6">
        {/* Category Sections */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories
            .filter((category) => selectedCategories.includes(category.id)) // Only render selected categories
            .map((category) => (
              <div key={category.id} className="mb-10">
                <h2 className="text-3xl lora-bold text-gray-800 mb-8">
                  <HighlightText>{category.name}</HighlightText>
                </h2>

                {/* Articles in the category */}
                <div className="grid grid-cols-1 gap-6">
                  {getArticlesForColumn(category).map((article, index) => (
                    <div key={index}>
                      {/* Card for the first article */}
                      {index === 0 ? (
                        <div className="group overflow-hidden transition-shadow duration-300 border-b-1 border-gray-300">
                          <img
                            src={article.imageUrl}
                            alt={article.headline}
                            className="w-full h-56 sm:h-72 md:h-48 lg:h-36 object-cover group-hover:opacity-80 transition-opacity duration-300"
                          />
                          <div className="pb-6 pt-2">
                            <h3 className="text-xl lora-bold text-gray-800 mb-2">{article.headline}</h3>
                            <p className="text-gray-600 text-sm mb-4 overflow-hidden text-ellipsis line-clamp-2">
                              {article.description}
                            </p>
                            <a
                              href={article.link}
                              className="text-sm font-medium"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <HighlightText>Read more</HighlightText>
                            </a>
                          </div>
                        </div>
                      ) : (
                        // List item for subsequent articles
                        <div className="text-gray-800 border-b-1 pb-4 border-gray-300">
                          <h3 className="lora-bold text-lg">{article.headline}</h3>
                          <p className="text-gray-600 text-sm mb-2 overflow-hidden text-ellipsis line-clamp-2">
                            {article.description}
                          </p>
                          <a
                            href={article.link}
                            className="text-sm font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <HighlightText>Read more</HighlightText>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
