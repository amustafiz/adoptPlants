import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Ad } from "@/types";
import classes from "./AdSummary.module.scss";
// import { CldImage } from "next-cloudinary";

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
  const { title, description, _id: id, imageUrl, authorId } = ad;

  return (
    <Link href={`ads/${id}`} className={classes.section}>
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
        <Image
          alt="title"
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
    </Link>
  );
};

export default AdSummary;
