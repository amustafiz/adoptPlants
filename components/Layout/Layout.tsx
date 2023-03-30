import React, { FunctionComponent, ReactNode, useContext } from "react";
import Head from "next/head";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Adopt a plant application</title>
        <meta name="description" content="An app to exchange/donate plants" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          overflowY: "scroll",
        }}
      >
        <div>Header space</div>
        <main style={{ height: "100%" }}>{children}</main>
      </div>
    </>
  );
};
export default Layout;
