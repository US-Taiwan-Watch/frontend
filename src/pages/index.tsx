import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import { Link } from "../components/link";
import { ProTip } from "../components/pro-tip";
import { Copyright } from "../components/copyright";
import { useFetchUser } from "../lib/user";
import { Layout } from "../components/layout";
import { IconFB } from "../styles";
import Image from "next/image";
import { Grid, Paper } from "@mui/material";
import { theme } from "../styles/theme";

const Section: React.FC<BoxProps> = (props) => (
  <Box {...props} sx={{
    py: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}>
    {props.children}
  </Box>
)

const Home: NextPage = () => {
  return (
    <Layout>
      <Paper
        sx={{
          position: 'relative',
          color: '#fff',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(/assets/banner.png)`,
          borderRadius: 0,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src='/assets/banner.png' alt='oo' />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h4" color="inherit" gutterBottom>
                U.S. Taiwan Watch 美國台灣觀測站
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                subtitle
              </Typography>
              <Link variant="subtitle1" href="#">
                <IconFB sx={{ verticalAlign: "middle", height: 35, width: 35 }} />
              </Link>

            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Section id="about">
        <Typography variant="h5" component="h1" gutterBottom id="about">
          關於我們
        </Typography>
        <Typography variant="h6" color="inherit" paragraph>
          lalalalala
        </Typography>
      </Section>
      <Section id="partners">
        <Typography variant="h5" component="h1" gutterBottom id="about">
          合作夥伴
        </Typography>
        <Typography variant="h6" color="inherit" paragraph>
          lalalalal
        </Typography>
      </Section>
      <Section id="follow">
        <Typography variant="h5" component="h1" gutterBottom id="about">
          追蹤我們
        </Typography>
        <Typography variant="h6" color="inherit" paragraph>
          lalalalal
        </Typography>
      </Section>
      <Section id="join">
        <Typography variant="h5" component="h1" gutterBottom id="about">
          加入我們
        </Typography>
        <Typography variant="h6" color="inherit" paragraph>
          各組介紹
        </Typography>
        <Link variant="subtitle1" href="#">
          報名成為志工！
        </Link>
      </Section>
      <Section id="donate">
        <Typography variant="h5" component="h1" gutterBottom id="about">
          支持我們
        </Typography>
        <Typography variant="h6" color="inherit" paragraph>
          lalalalal
        </Typography>
        <Link variant="subtitle1" href="#">
          前往贊助
        </Link>
      </Section>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconFB sx={{ verticalAlign: "middle", height: 35, width: 35 }} />
        <Copyright color={"green"} />
      </Box>

    </Layout >
  );
};

export default Home;
