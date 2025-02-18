import SourcePropsInterface from "../../interfaces/SourcesPropsInterface";
import { Source } from "../../interfaces/ArticleInterface";

const SourceSeparator: React.FC<SourcePropsInterface> = ({ article, extraClasses = "" }) => {
  const isSourceStr = typeof article.source === "string" && article.source !== null;
  const source = isSourceStr ? article.source : (article.source as Source)?.name;

  return (
    <div className={`flex items-center ${extraClasses}`}>
      <span className="roboto-bold text-sm text-gray-400">{source as string}</span>
      {article.subSource && (
        <>
          <span className="mx-2 text-gray-400">|</span>
          <span className="roboto-bold text-sm text-gray-400">{article.subSource}</span>
        </>
      )}
      <span className="mx-2 text-gray-400">|</span>
      <span className="roboto-bold text-sm text-gray-400">{article.publicationDate}</span>
    </div>
  );
};

export default SourceSeparator;
