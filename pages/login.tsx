/*
page for invitation to login for viewing protected content
*/
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import AuthForm from "@/components/Auth/AuthForm";
import type { ReactElement } from "react";
import RedirectButton from "@/components/UI/RedirectButton";

const AuthPage = () => {
  const [isLoading] = useState(false);

  const [backToHomePage, setBackToHomePage] = useState(false);

  function showHomePageButton(val: boolean): void {
    setBackToHomePage((prev) => val);
  }

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <AuthForm redirectBtnHandler={showHomePageButton} />
      )}
      {backToHomePage && <RedirectButton />}
    </>
  );
};

AuthPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AuthPage;
