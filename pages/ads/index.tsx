/*
Protected content
*/

import React from "react";
import { GetStaticProps } from "next";
import type { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";
//1
import { Ad, Water } from "@/types";
import Carousel from "@/components/Ads/Carousel";
import { listAds } from "../api/ads";

const Posts = (props: Props) => {
  return (
    <div>
      <Carousel ads={props?.allAds} header={"The best this season"} />
      <Carousel ads={props?.frequentWateringAds} header={"Moisture Lovers"} />
      <Carousel ads={props?.allAds} header={"The best this season"} />
      <Carousel ads={props?.frequentWateringAds} header={"Moisture Lovers"} />
    </div>
  );
};

Posts.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

interface Props {
  allAds?: Ad[];
  frequentWateringAds?: Ad[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allAds = await listAds();
  const frequentWateringAds = await listAds({ watering: Water.frequent });

  if (
    Array.isArray(allAds) &&
    !allAds &&
    Array.isArray(frequentWateringAds) &&
    !frequentWateringAds
  ) {
    return { notFound: true };
  }

  return {
    props: {
      allAds,
      frequentWateringAds,
    },
  };
};

export default Posts;
