import type { GetStaticProps, NextPage } from "next";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { Link } from "../components/link";
import { Layout } from "../components/layout";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  useMediaQuery,
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
import { initApolloClient } from "../lib/with-apollo";
import { BannersQueryDocument } from "../lib/page-graphql/query-banners.graphql.interface";
import { SmallCardItem } from "../components/card-list";
import { ArticleType } from "../generated/graphql-types";
import { getPaginatedPublishedPosts } from "./articles";
import { PublicPostsQuery } from "../lib/page-graphql/query-public-posts.graphql.interface";
import { getPostUrl } from "./admin/[post-type]";
import { forwardRef, useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { theme } from "../styles/theme";

interface HomeProps {
  newsLetters: NewsLetter[];
  podcasts: PodcastEpisode[];
  banners: string[];
  draftMode: boolean;
  posts: PublicPostsQuery["getPostsWithType"]["items"];
}

const SectionTitle = forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Typography
        variant="h5"
        component="h2"
        sx={{ my: 5, textAlign: "center" }}
      >
        {children}
      </Typography>
    );
  }
);

const Home: NextPage<HomeProps> = ({
  newsLetters,
  podcasts,
  banners,
  draftMode,
  posts,
}) => {
  const { i18n } = useI18n();
  const bannerSliderRef = useRef<Slider>(null);
  const podcastSliderBoxRef = useRef<HTMLDivElement>(null);
  const podcastSliderRef = useRef<Slider>(null);
  const [podcastSliderBoxWidth, setPodcastSliderBoxWidth] = useState(0);
  const [podcastCurrentSlider, setPodcastCurrentSlider] = useState(0);

  useEffect(() => {
    const updateContainerWidth = () => {
      const width = podcastSliderBoxRef.current?.scrollWidth || 0;
      setPodcastSliderBoxWidth(width);
    };

    updateContainerWidth(); // Initial width
    window.addEventListener("resize", updateContainerWidth);

    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  if (draftMode) {
    const buttonWidth = "100px";
    const podcastSlickEdgeWidth = 40;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: !isSm,
      centerPadding: buttonWidth,
      className: "banner-slick",
      nextArrow: <></>,
      prevArrow: <></>,
    };
    const podcastCarouselSetting = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: isSm ? 1 : 2,
      slidesToScroll: isSm ? 1 : 2,
      className: "podcast-slick",
      variableWidth: true,
      nextArrow: <></>,
      prevArrow: <></>,
      afterChange: (currentSlide: number) =>
        setPodcastCurrentSlider(currentSlide),
    };
    return (
      <Layout draftMode={draftMode}>
        <Box sx={{ width: "100%", position: "relative", maxHeight: "100vh" }}>
          {!isSm && (
            <Button
              sx={{
                position: "absolute",
                left: 0,
                width: buttonWidth,
                height: "100%",
                zIndex: 2,
              }}
              onClick={() => bannerSliderRef.current?.slickPrev()}
            >
              <Avatar sx={{ opacity: "50%" }}>
                <ArrowBackIosNewIcon />
              </Avatar>
            </Button>
          )}
          {!isSm && (
            <Button
              sx={{
                position: "absolute",
                right: 0,
                width: buttonWidth,
                height: "100%",
                zIndex: 2,
              }}
              onClick={() => bannerSliderRef.current?.slickNext()}
            >
              <Avatar sx={{ opacity: "50%" }}>
                <ArrowForwardIosIcon />
              </Avatar>
            </Button>
          )}
          <Slider {...settings} ref={bannerSliderRef}>
            {banners?.map((banner, i) => (
              <Box key={i}>
                <img
                  src={banner}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    margin: "0 auto",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            backgroundImage: "url(/assets/home-upper-bg.svg)",
            backgroundSize: "100% 100%",
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
          </Container>
          {/* <img src={`/assets/home_pc_1.svg`} alt={`icon`} width="100%" /> */}
        </Box>
        <Container>
          <SectionTitle>Podcasts</SectionTitle>
          <Box>
            <Box
              ref={podcastSliderBoxRef}
              sx={{
                px: podcastSlickEdgeWidth + "px",
                position: "relative",
                height: "140px",
                marginBottom: 8,
              }}
            >
              {podcastCurrentSlider > 0 && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    padding: 0,
                    width: podcastSlickEdgeWidth + "px",
                    height: "100%",
                    zIndex: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => podcastSliderRef.current?.slickPrev()}
                />
              )}
              {podcastCurrentSlider + (isSm ? 0 : 1) < podcasts.length - 1 && (
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    padding: 0,
                    width: podcastSlickEdgeWidth + "px",
                    height: "100%",
                    zIndex: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => podcastSliderRef.current?.slickNext()}
                />
              )}
              <Slider {...podcastCarouselSetting} ref={podcastSliderRef}>
                {podcasts.map((podcast, i) => (
                  <div
                    key={i}
                    style={{
                      width:
                        (podcastSliderBoxWidth - podcastSlickEdgeWidth * 2) /
                          (isSm ? 1 : 2) +
                        "px",
                    }}
                  >
                    <div style={{ padding: "0 8px", height: "100%" }}>
                      <iframe
                        src={`https://player.soundon.fm/embed/?podcast=6cdfccc6-7c47-4c35-8352-7f634b1b6f71&episode=${podcast.id}`}
                        style={{
                          width: "100%",
                          height: "140px",
                          border: "none",
                          borderRadius: "4px",
                          boxShadow: "0 1px 8px rgba(0, 0, 0, .2)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </Box>
            <Box
              sx={{
                my: 4,
                textAlign: "center",
              }}
            >
              <Link variant="button" href="/podcast">
                <Button variant="contained">更多 podcast 單集</Button>
              </Link>
            </Box>
          </Box>
          <SectionTitle>Latest Posts</SectionTitle>
          <Grid container>
            {posts.map((post) => (
              <Grid key={post.id} item xs={12} sm={6} md={3} sx={{ px: 1 }}>
                <SmallCardItem
                  url={getPostUrl(post)}
                  title={post.title?.text || ""}
                  content={post.text || ""}
                  displayDate={
                    post.publishedTime
                      ? new Date(post.publishedTime).toLocaleDateString()
                      : ""
                  }
                  image={post.imageSource || undefined}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              my: 4,
              textAlign: "center",
            }}
          >
            <Link variant="button" href="/articles">
              <Button variant="contained">更多文章</Button>
            </Link>
          </Box>
          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
            .banner-slick .slick-dots {
              bottom: 5px;
            }
            .podcast-slick .slick-list {
              margin: 0 -${podcastSlickEdgeWidth}px;
              padding: 0 ${podcastSlickEdgeWidth}px;
            }
          `}</style>
        </Container>
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
                    avatar={<SocialMediaIcon size={24} type={media.type} />}
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
  const client = initApolloClient();
  const bannersRes = await client.query({ query: BannersQueryDocument });
  const letters = await getNewsLetters();
  const podcasts = await getPodcastEpisodes();
  const paginatedPosts = await getPaginatedPublishedPosts(
    ArticleType.Article,
    1,
    4,
    client
  );

  return {
    props: {
      newsLetters: letters.slice(0, 4),
      podcasts: podcasts.slice(0, 6),
      banners: bannersRes.data.banners,
      draftMode: !!draftMode,
      posts: paginatedPosts.items,
    },
    revalidate: 300, // In seconds
  };
};

export default Home;
