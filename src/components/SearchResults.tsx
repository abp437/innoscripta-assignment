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
    <div className="space-y-4">
      {filteredArticles.map((article) => (
        <div key={article.id} className="border p-4 rounded-md">
          <h3 className="text-xl font-semibold">{article.title}</h3>
          <p className="text-sm">{article.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
