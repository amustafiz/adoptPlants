import React from "react";
import type { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";
import type { NextPageWithLayout } from "./_app";
import { FormValueProps } from "@/components/Ads/CreateAdForm";
import CreateAdForm from "@/components/Ads/CreateAdForm";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const CreateAdPage: NextPageWithLayout = () => {
  const { data: session } = useSession();

  const handleFormSubmit = async (values: FormValueProps) => {
    const response = await fetch("/api/users/postAd", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
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
