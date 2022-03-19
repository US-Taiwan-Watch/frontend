import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "../../components/link";
import { ProTip } from "../../components/pro-tip";
import { Copyright } from "../../components/copyright";
import { SwitchRenderer } from "../../components/switch-renderer";
import { green } from "@mui/material/colors";

const About: NextPage = () => (
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
      <Box maxWidth="sm">
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the home page
        </Button>
      </Box>
      <ProTip />
      <Copyright color={"red"} />
      <SwitchRenderer color={green} />
    </Box>
  </Container>
);

export default About;
