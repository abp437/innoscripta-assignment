import { memo } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = memo(({ article }: ArticleCardProps) => (
  <div className="article p-4 border rounded-lg shadow-sm mb-4">
    <h2 className="text-2xl font-bold mb-2 lora-bold">{article.title}</h2>
    <p className="text-gray-600 mb-3 playfair-display-medium">{article.description}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
      Read more
    </a>
    <p className="mt-2 text-sm text-gray-500">
      <strong>Source:</strong> {article.source?.name || "Unknown"}
    </p>
  </div>
));

export default ArticleCard;
