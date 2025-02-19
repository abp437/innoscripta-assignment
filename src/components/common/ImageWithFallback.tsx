import { useState } from "react";
import NewsIcon from "../icons/NewsIcon";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  imgClasses?: string;
  iconSize?: number;
  iconClasses?: string;
  iconWrapperClasses?: string;
  areClassesSame?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  imgClasses = "",
  iconSize = 24,
  iconClasses = "",
  iconWrapperClasses = "",
  areClassesSame = true,
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc("");
  };

  const appliedImgClasses = areClassesSame ? imgClasses : "";
  const appliedIconWrapperClasses = areClassesSame ? imgClasses : iconWrapperClasses;

  return (
    <>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} onError={handleError} className={appliedImgClasses} />
      ) : (
        <div className={`flex justify-center items-center ${appliedIconWrapperClasses}`}>
          <NewsIcon extraClasses={iconClasses} width={iconSize} height={iconSize} />
        </div>
      )}
    </>
  );
};

export default ImageWithFallback;
