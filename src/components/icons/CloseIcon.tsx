import IconProps from "../../interfaces/props/IconPropsInterface";

const CloseIcon: React.FC<IconProps> = ({ extraClasses = "", width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    fill="#e7000b"
    width={width}
    height={height}
    className={extraClasses}
  >
    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
  </svg>
);

export default CloseIcon;
