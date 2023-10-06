import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Layout } from "../components/layout";
import { Box, Container } from "@mui/material";
import { useI18n } from "../context/i18n";
import { Banner } from "../components/banner";
import { SectionTitle } from ".";

const About: NextPage = () => {
  const { i18n } = useI18n();

  return (
    <Layout draftMode={true}>
      <Banner
        imageSrc="https://static.ustw.watch/public-image/website/banners/about.png"
        draftMode={true}
      />
      <Container sx={{ my: 5 }}>
        <SectionTitle>{i18n.strings.header.about}</SectionTitle>
        <Box>
          {i18n.strings.about.ourStoryDesc.map((p) => (
            <Typography variant="subtitle1" paragraph>
              {p}
            </Typography>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default About;
