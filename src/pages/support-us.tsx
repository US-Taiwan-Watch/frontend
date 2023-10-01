import { NextPage } from "next";
import { Banner } from "../components/banner";
import { Layout } from "../components/layout";
import { useI18n } from "../context/i18n";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { Link } from "../components/link";
import { Constants } from "../utils/constants";
import { SectionTitle } from ".";

const SupportUsPage: NextPage = () => {
  const { i18n } = useI18n();
  const theme = useTheme();

  return (
    <Layout
      title={i18n.strings.articles.title}
      description={i18n.strings.articles.desc}
      draftMode={true}
    >
      <Banner
        imageSrc="https://static.ustw.watch/public-image/website/banners/ustw_book.png"
        draftMode={true}
      />
      <Container sx={{ my: 5 }}>
        <SectionTitle>{i18n.strings.header.donate}</SectionTitle>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            py: 3,
            marginBottom: 5,
            backgroundColor: alpha(theme.palette.primary.light, 0.32),
            boxShadow: 0,
            width: "100%",
          }}
        >
          <Typography variant="body1" sx={{ my: 3 }} color="primary.dark">
            {i18n.strings.landing.donateDesc}
          </Typography>
          <Box
            sx={{
              my: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 450,
              maxWidth: "100%",
            }}
          >
            {[
              {
                text: i18n.strings.landing.donateButton,
                url: Constants.links.donate,
              },
              {
                text: i18n.strings.landing.donateButtonTW,
                url: Constants.links.donateTW,
              },
            ].map((action, i) => (
              <Link
                key={i}
                variant="button"
                href={Constants.links.donate}
                sx={{ mx: 1 }}
              >
                <Button variant="contained">{action.text}</Button>
              </Link>
            ))}
          </Box>

          {/* {socialMedias.map((media) => (
          <IconButton
            target="_blank"
            aria-label={media.name}
            href={media.link}
            key={media.name}
            color="primary"
          >
            <SocialMediaIcon size={25} type={media.type} bw={true} />
          </IconButton>
        ))} */}
        </Paper>
      </Container>
    </Layout>
  );
};

export default SupportUsPage;
