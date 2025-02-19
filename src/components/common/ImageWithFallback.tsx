import { useState } from "react";
import NewsIcon from "../icons/NewsIcon";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  imgClasses?: string;
  iconSize?: number;
  iconClasses?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  imgClasses = "",
  iconSize = 24,
  iconClasses = "",
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc("");
  };

  return (
    <>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} onError={handleError} className={imgClasses} />
      ) : (
        <div className={`flex justify-center items-center ${iconClasses}`}>
          <NewsIcon width={iconSize} height={iconSize} />
        </div>
      )}
    </>
  );
};

export default ImageWithFallback;
