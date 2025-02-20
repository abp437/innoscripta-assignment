import SourcePropsInterface from "../../interfaces/props/SourcesPropsInterface";
import { Source } from "../../interfaces/ArticleInterface";

const SourceSeparator: React.FC<SourcePropsInterface> = ({ article, extraClasses = "" }) => {
  const isSourceStr = typeof article.source === "string" && article.source !== null;
  const source = isSourceStr ? article.source : (article.source as Source)?.name;

  return (
    <div className={`flex items-center basis-1/3 ${extraClasses}`}>
      <span className="roboto-regular text-sm text-gray-400 truncate" title={source as string}>
        {source as string}
      </span>
      {article.category && (
        <span
          className="roboto-regular text-sm text-gray-400 mx-2 border-l-1 border-gray-300 pl-2 truncate"
          title={article.category}
        >
          {article.category}
        </span>
      )}
      <span
        className="roboto-regular text-sm text-gray-400 mx-2 border-l-1 border-gray-300 pl-2 truncate"
        title={article.publicationDate}
      >
        {article.publicationDate}
      </span>
    </div>
  );
};

export default SourceSeparator;
