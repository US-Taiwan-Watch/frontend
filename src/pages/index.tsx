import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "../components/link";
import { ProTip } from "../components/pro-tip";
import { Copyright } from "../components/copyright";
import { useFetchUser } from "../lib/user";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      <h1>Next.js and Auth0 Example</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in{" "}
            <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <img src={user.picture} alt="user picture" />
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>
        </>
      )}

      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            MUI v5 + Next.js with TypeScript example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright color={"green"} />
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
