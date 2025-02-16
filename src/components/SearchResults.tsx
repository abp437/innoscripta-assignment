import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Article {
  id: number;
  title: string;
  summary: string;
  category: string;
}

const dummyArticles: Article[] = [
  { id: 1, title: "Tech News Today", summary: "Latest updates in tech...", category: "Tech" },
  { id: 2, title: "Sports Highlights", summary: "Biggest moments in sports...", category: "Sports" },
  { id: 3, title: "Political Debate 2025", summary: "Political insights...", category: "Politics" },
  { id: 4, title: "New Tech Innovations", summary: "Exploring new tech breakthroughs...", category: "Tech" },
  { id: 5, title: "Sports Legends", summary: "Top players of all time...", category: "Sports" },
];

const SearchResults: React.FC = () => {
  const searchQuery = useSelector((state: RootState) => state.search.query); // Get search query from Redux

  // Filter articles based on the search query
  const filteredArticles = dummyArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (filteredArticles.length === 0) {
    return <p className="text-center py-4">No articles found for "{searchQuery}"</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      {filteredArticles.map((article) => (
        <div key={article.id} className="border-b-1 p-4 mb-4">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
            <img
              className="w-full h-48 md:w-24 md:h-24 object-cover rounded-md group-hover:opacity-80"
              src="https://placehold.co/200x200"
              alt={article.title}
            />
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-semibold">{article.title}</h3>
              <p className="text-lg">{article.summary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
