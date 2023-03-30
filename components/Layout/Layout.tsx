import React, { FunctionComponent, ReactNode, useContext } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

import NotificationContext from "@/store/NotificationContext";
import Header from "./Header";
import Notification from "../UI/Notification";
import { NotificationType } from "@/types";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
}: React.PropsWithChildren) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification =
    notificationCtx.notification as NotificationType | null;

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
        <Header />
        <main style={{ height: "100%" }}>{children}</main>
        {activeNotification && (
          <Notification
            title={activeNotification?.title}
            status={activeNotification?.status}
            message={activeNotification?.message}
          />
        )}
      </div>
    </>
  );
};
export default Layout;
