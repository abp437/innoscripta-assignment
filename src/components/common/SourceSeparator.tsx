import SourcePropsInterface from "../../interfaces/props/SourcesPropsInterface";
import { Source } from "../../interfaces/ArticleInterface";

const SourceSeparator: React.FC<SourcePropsInterface> = ({ article, extraClasses = "" }) => {
  const isSourceStr = typeof article.source === "string" && article.source !== null;
  const source = isSourceStr ? article.source : (article.source as Source)?.name;

  return (
    <div className={`flex items-center flex-wrap ${extraClasses}`}>
      <span className="roboto-bold text-sm text-gray-400">{source as string}</span>
      {article.subSource && (
        <span className="roboto-bold text-sm text-gray-400 mx-2 border-l-2 border-gray-300 pl-2">
          {article.subSource}
        </span>
      )}
      <span className="roboto-bold text-sm text-gray-400 mx-2 border-l-2 border-gray-300 pl-2">
        {article.publicationDisplayDate}
      </span>
    </div>
  );
};

export default SourceSeparator;
