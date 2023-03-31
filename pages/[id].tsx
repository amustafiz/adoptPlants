import React from "react";
import { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";
import { GetServerSideProps } from "next";
import { getOneAd } from "./api/ads";
import PostContent from "@/components/Ads/AdDetails/AdContent";

const DetailsPage = ({ imageDetails }) => {
  return (
    <>
      <PostContent imageDetails={imageDetails} />
    </>
  );
};

DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const imageDetails = await getOneAd(id);

  return {
    props: { imageDetails },
  };
};

export default DetailsPage;
