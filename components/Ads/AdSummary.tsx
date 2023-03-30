import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ad } from "@/types";
import classes from "./AdSummary.module.scss";

type AdSummaryProps = {
  ad: Ad;
  idx: number;
  currentIndex: number;
};

const AdSummary: React.FunctionComponent<AdSummaryProps> = ({
  ad,
  idx,
  currentIndex,
}: AdSummaryProps) => {
  const { title, description, _id, imageUrl } = ad;

  return (
    <Link href={`${_id}`} className={classes.section}>
      <div className={classes.contentOverlay}>
        <div className={classes.textContent}>
          <h3>{title}</h3>
          <p className={classes.truncateSection}>{description}</p>
        </div>
      </div>
      <div
        className={classes.img}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {ad.imageUrl && (
          <Image
            src={`${imageUrl}`}
            alt="plant"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
    </Link>
  );
};

export default AdSummary;
