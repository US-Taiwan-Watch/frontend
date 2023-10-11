import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Layout } from "../components/layout";
import { Box, Button, Container } from "@mui/material";
import { useI18n } from "../context/i18n";
import { Banner } from "../components/banner";
import { SectionTitle } from ".";
import { Link } from "../components/link";
import { Constants } from "../utils/constants";

const About: NextPage = () => {
  const { i18n } = useI18n();

  return (
    <Layout
      title={i18n.strings.header.about}
      description={i18n.strings.landing.aboutShort.join("")}
      draftMode={true}
    >
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
        <Box
          sx={{
            my: 4,
            textAlign: "center",
          }}
        >
          <Link variant="button" href={`mailto:${Constants.links.email}`}>
            <Button variant="contained">{i18n.strings.about.contactUs}</Button>
          </Link>
        </Box>
      </Container>
    </Layout>
  );
};

export default About;
