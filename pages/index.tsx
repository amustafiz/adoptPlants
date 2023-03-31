import type { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";
import NavLogo from "@/components/Layout/NavLogo";

const WelcomePage = () => {
  return (
    <div>
      <p>Welcome to the plant app beta</p>
      <NavLogo />
    </div>
  );
};

WelcomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WelcomePage;
