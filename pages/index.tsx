import React from "react";
import type { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";

export default function Posts() {
  return <>This is index page.</>;
}

Posts.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
