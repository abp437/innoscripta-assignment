import HighlightText from "./HighlightText";

interface ReadMoreLinkProps {
  url: string;
  extraClasses?: string;
}

const ReadMoreLink: React.FC<ReadMoreLinkProps> = ({ url, extraClasses }) => {
  return (
    <a href={url} className={`lora-bold ${extraClasses}`} target="_blank" rel="noopener noreferrer">
      <HighlightText>Read more</HighlightText>
    </a>
  );
};

export default ReadMoreLink;
