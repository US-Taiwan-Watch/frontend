import { GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Layout } from "../components/layout";
import {
  Box,
  Container,
} from "@mui/material";
import { initApolloClient } from "../lib/with-apollo";
import { useI18n } from "../context/i18n";
import { BannersQueryDocument } from "../lib/page-graphql/query-banners.graphql.interface";
import { Banner } from "../components/banner";

interface AboutProps {
  draftMode: boolean;
}

const About: NextPage<AboutProps> = ({ 
  draftMode
 }) => {
  const { i18n } = useI18n();

  return (
    <Layout draftMode={draftMode}>
      <Banner
          imageSrc="https://static.ustw.watch/public-image/website/banners/ustw_book.png"
          draftMode={true}
        />
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Container
            sx={{
              marginTop: "32px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "auto",
              marginBottom: 10,
            }}
          >
            <Typography
              variant="h5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our Story
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              US Taiwan Watch is a think tank and media creator dedicated to making the relationship between 
              the United States and Taiwan more resilient, more productive, and more purposeful. 
              We are building a community for a new generation of thinkers and doers. 
              Together we are telling the story of why the US matters for Taiwan, and why Taiwan matters for the US.
            </Typography>
          </Container>
        </Box>
    </Layout>
  )
};

export const getStaticProps: GetStaticProps<AboutProps> = async ({
  draftMode,
}) => {
  const client = initApolloClient();
  const bannersRes = await client.query({ query: BannersQueryDocument });
  return {
    props: {
      draftMode: !!draftMode,
    },
    revalidate: 300,
  };
};

export default About;