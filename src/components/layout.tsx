import * as React from "react";
import Head from "next/head";
import { IUser } from "../lib/user";
import { Header } from "./header";
import { IconFB } from "../styles";
import { Copyright } from "./copyright";
import { Box } from "@material-ui/core";

export interface ILayoutProps {
  user?: IUser;
  loading?: boolean;
}

export const Layout: React.FC<ILayoutProps> = ({
  user,
  loading = false,
  children,
}) => (
  <>
    <Head>
      <title>US Taiwan Watch</title>
    </Head>

    <Header user={user} loading={loading} />

    <main>
      <div>{children}</div>
    </main>

    <style jsx global>{`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      html {
        scroll-behavior: smooth;
      }
    `}</style>
  </>
);
