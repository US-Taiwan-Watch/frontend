import * as React from "react";
import Head from "next/head";
import { IUser } from "../lib/user";
import { Header } from "./header";
import { Copyright } from "./copyright";
import { Box } from "@material-ui/core";
import { SocialMediaGroup } from "./social-media";
import Image from "next/image";

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

    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Box
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ mx: 2 }}><Image src="/assets/logo-long.png" width={200} height={34} /></Box>
        <SocialMediaGroup />
      </Box>
      <Copyright color={"green"} />
    </Box>


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
