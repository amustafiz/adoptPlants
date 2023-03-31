import React from "react";
import type { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";
import type { NextPageWithLayout } from "./_app";
import CreateAdForm from "@/components/Ads/CreateAdForm";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
//1
const CreateAdPage: NextPageWithLayout = () => {
  const { data: session } = useSession();

  const handleFormSubmit = async (values: any) => {
    const response = await fetch("/api/ads", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
  };

  return <>{session && <CreateAdForm handleSubmit={handleFormSubmit} />}</>;
};

CreateAdPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateAdPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
