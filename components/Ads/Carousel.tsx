import React from "react";
import classes from "./Carousel.module.scss";
import AdSummary from "./AdSummary";
import { Ad } from "@/types";

const DISPLAYED_ADS_COUNT = 3;

type CarouselType = {
  ads?: Ad[];
  header: string;
};

const Carousel = ({ ads, header }: CarouselType) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [displayedAds, setDisplayedAds] = React.useState<Ad[] | []>([]);

  const handleRightButtonClick = () => {
    if (currentIndex + DISPLAYED_ADS_COUNT >= ads!.length) {
      return;
    } else {
      setCurrentIndex((prev) => prev + DISPLAYED_ADS_COUNT);
    }
  };

  const handleLeftButtonClick = () => {
    if (currentIndex - DISPLAYED_ADS_COUNT <= 0) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev - DISPLAYED_ADS_COUNT);
    }
  };

  React.useEffect(() => {
    if (!ads) {
      return;
    }

    setDisplayedAds(ads?.slice(currentIndex, currentIndex + 4));
  }, [currentIndex, ads]);

  return (
    <div id="main">
      <div className={classes.header}>
        <h4>{header}</h4>
      </div>
      <div className={classes.carousel}>
        <button
          className={classes.arrowleft}
          onClick={handleLeftButtonClick}
          disabled={currentIndex <= 0}
        >
          <svg
            width="20"
            height="30"
            viewBox="0 0 15 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12.1784L1.5379 10.8137L0.264205 12.1784L1.5379 13.543L3 12.1784ZM11.0379 0.63535L1.5379 10.8137L4.4621 13.543L13.9621 3.36465L11.0379 0.63535ZM1.5379 13.543L11.0379 23.7214L13.9621 20.9921L4.4621 10.8137L1.5379 13.543Z"
              fill="#000000"
            />
          </svg>
        </button>
        <div className={classes.slider}>
          {displayedAds?.map((ad, i) => (
            <AdSummary key={i} idx={i} ad={ad} currentIndex={currentIndex} />
          ))}
        </div>
        <button
          className={classes.arrowright}
          onClick={handleRightButtonClick}
          disabled={currentIndex + DISPLAYED_ADS_COUNT >= ads!.length}
        >
          <svg
            width="20"
            height="30"
            viewBox="0 0 15 24"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 12.1784L12.9621 10.8137L14.2358 12.1784L12.9621 13.543L11.5 12.1784ZM3.4621 0.63535L12.9621 10.8137L10.0379 13.543L0.537902 3.36465L3.4621 0.63535ZM12.9621 13.543L3.4621 23.7214L0.537902 20.9921L10.0379 10.8137L12.9621 13.543Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Carousel;
