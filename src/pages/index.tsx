import type { GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link } from "../components/link";
import { Layout } from "../components/layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../components/social-media";
import { Constants } from "../utils/constants";
import { useI18n } from "../context/i18n";
import { Banner } from "../components/banner";
import { FeaturedNewsLetters, getNewsLetters, NewsLetter } from "./newsletters";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Section } from "../components/section";
import { getPodcastEpisodes, PodcastEpisode } from "./api/podcast-episodes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HomeProps {
  newsLetters: NewsLetter[];
  podcasts: PodcastEpisode[];
  draftMode: boolean;
}

const Home: NextPage<HomeProps> = ({ newsLetters, podcasts, draftMode }) => {
  const { i18n } = useI18n();
  if (draftMode) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const podcastCarouselSetting = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    const banners = [
      { url: "/assets/ustw_book.png" },
      { url: "/assets/test_banner.png" },
    ];
    return (
      <Layout draftMode={draftMode}>
        <Slider {...settings}>
          {banners?.map((banner, i) => (
            <Box key={i}>
              <img
                src={banner?.url}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  margin: "0 auto",
                }}
              />
            </Box>
          ))}
        </Slider>
        {/* <Banner
          title={i18n.strings.brand.fullName}
          subtitle={i18n.strings.header.subtitle}
          actions={[{ text: i18n.strings.header.donate, url: '#donate' }]}
        /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // justifyContent: 'center',
            // gridTemplateRows: '1fr 2fr',
            // textAlign: 'center',
            // alignItems: 'center',
            // width: '100%',
            // height: '380px ',
            background: `url(/assets/home_pc_1.svg) no-repeat center / contain`,
          }}
        >
          <Box
            sx={{
              width: "75%",
              marginTop: "32px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "380px ",
            }}
          >
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              USTW is...
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              US Taiwan Watch is a 501c(3) non-profit organization that aims to
              strengthen U.S.-Taiwan relations through civil society and civil
              engagement. US Taiwan Watch was founded in June 2017 by a group of
              U.S.-based Taiwanese engineers. The founders’ initial objective
              was to synthesize data on Taiwan-related bills in Congress on a
              website to facilitate greater Taiwanese understanding of U.S.
              policy. We later expanded to a series of other initiatives. This
              included providing more comprehensive analysis on U.S. foreign
              policy and U.S.-Taiwan relations and recording weekly podcast
              episodes to discuss U.S.-Taiwan relations.
            </Typography>
          </Box>
          {/* <img src={`/assets/home_pc_1.svg`} alt={`icon`} width="100%" /> */}
        </Box>
        <Typography>Podcasts</Typography>
        <Box
          sx={{
            width: "75%",
            margin: "24px auto",
          }}
        >
          <Slider {...podcastCarouselSetting}>
            {podcasts.map((podcast, i) => (
              <Box
                key={i}
                sx={{
                  padding: "0 8px",
                }}
              >
                <iframe
                  src={`https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${podcast.id}`}
                  style={{
                    marginBottom: 20,
                    height: "140px",
                    width: "100%",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 1px 8px rgba(0, 0, 0, .2)",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        <Typography>Latest Posts</Typography>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        `}</style>
      </Layout>
    );
  }
  return (
    <Layout>
      <Banner
        title={i18n.strings.brand.fullName}
        subtitle={i18n.strings.header.subtitle}
        actions={[{ text: i18n.strings.header.donate, url: "#donate" }]}
      />
      <Section
        id="about"
        title={i18n.strings.header.about}
        description={i18n.strings.landing.aboutDesc}
        descLinks={i18n.strings.landing.aboutDescLinks}
        right={<img src="/assets/watch.png" width="70%" />}
      />
      <Section id="partners" title={i18n.strings.header.partners}>
        <Grid container spacing={6} alignItems="center" sx={{ py: 3 }}>
          {Constants.partners.map((item, i) => (
            <Grid item key={"partner" + i} xs={6} sm={4} md={3}>
              <Link href={item.link} target="_blank">
                <img src={item.logo} alt={item.name} width="100%" />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Section>
      <Section
        id="podcast"
        title={i18n.strings.landing.latestPodcastEpisode}
        description={i18n.strings.social.podcast}
        actions={[
          { text: i18n.strings.landing.moreEpisodeButton, url: "/podcast" },
        ]}
      >
        <Grid container>
          {podcasts.map((podcast, i) => (
            <Grid
              item
              key={i}
              lg={6}
              md={12}
              sm={12}
              xs={12}
              px={1}
              sx={{
                display:
                  i == 1
                    ? { lg: "block", md: "none", sm: "none", xs: "none" }
                    : {},
              }}
            >
              <iframe
                src={`https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${podcast.id}`}
                style={{
                  marginBottom: 20,
                  height: "140px",
                  width: "100%",
                  border: "none",
                  borderRadius: "4px",
                  boxShadow: "0 1px 8px rgba(0, 0, 0, .2)",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Section>
      <Section
        id="subscribe"
        title={i18n.strings.header.subscribe}
        description={i18n.strings.landing.subscribeDesc}
        actions={[
          {
            text: i18n.strings.landing.subscribeButton,
            url: Constants.links.newsletter,
          },
          {
            text: i18n.strings.landing.pastNewsLettersButton,
            url: "/newsletters",
          },
        ]}
      >
        <Typography variant="h6" component="h2">
          {i18n.strings.landing.pastNewsLetters}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FeaturedNewsLetters
            newsLetters={newsLetters.slice(0, 3)}
            noBreak={true}
          />
          <Link href="/newsletters">
            <IconButton sx={{ marginLeft: 2, py: 10 }}>
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </Link>
        </Box>
      </Section>
      <Section id="follow" title={i18n.strings.header.follow}>
        <Grid container spacing={5} alignItems="stretch">
          {socialMedias.map((media) => (
            <Grid item key={media.name} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardActionArea
                  href={media.link}
                  target="_blank"
                  sx={{ height: "100%" }}
                >
                  <CardHeader
                    avatar={<SocialMediaIcon type={media.type} />}
                    title={media.name}
                    titleTypographyProps={{
                      variant: "h6",
                    }}
                    subheaderTypographyProps={{
                      align: "center",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="info.dark"
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      {i18n.strings.social[media.type]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
      <Section
        id="join"
        title={i18n.strings.header.join}
        description={i18n.strings.landing.joinDesc}
        left={<img src="/assets/raise.png" width="100%" />}
        actions={[
          {
            text: i18n.strings.landing.joinButton,
            url: Constants.links.volunteer,
          },
        ]}
      />
      <Section
        id="donate"
        title={i18n.strings.header.donate}
        description={i18n.strings.landing.donateDesc}
        right={<img src="/assets/donate.png" width="100%" />}
        actions={[
          {
            text: i18n.strings.landing.donateButton,
            url: Constants.links.donate,
          },
          {
            text: i18n.strings.landing.donateButtonTW,
            url: Constants.links.donateTW,
          },
        ]}
      />
      <style jsx global>{`
        .section:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  draftMode,
}) => {
  const letters = await getNewsLetters();
  const podcasts = await getPodcastEpisodes();
  return {
    props: {
      newsLetters: letters.slice(0, 4),
      podcasts: [podcasts[0], podcasts[1]],
      draftMode: !!draftMode,
    },
    revalidate: 300, // In seconds
  };
};

export default Home;
