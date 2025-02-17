interface HighlightTextProps {
  children: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ children }) => (
  <>
    <span className="border-b-2">{children} </span>
    <span className="text-red-600">&gt;</span>
  </>
);

export default HighlightText;
