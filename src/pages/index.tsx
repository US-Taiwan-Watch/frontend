import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import { Link } from "../components/link";
import { Layout } from "../components/layout";
import { Button, Card, CardActionArea, CardContent, CardHeader, Container, Grid, ImageList, ImageListItem, Paper, useTheme } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../components/social-media";
import { Constants } from "../utils/constants";
import { useI18n } from "../context/i18n";
import Head from "next/head";

const Section: React.FC<BoxProps> = (props) => (
  <Box {...props} sx={{
    ...props.sx,
    py: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <Container>
      {props.children}
    </Container>
  </Box>
)

const Home: NextPage = () => {
  const { i18n } = useI18n();
  return (
    <Layout>
      <Head>
        <meta property="og:title" content={i18n.strings.brand.fullName} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta property="og:image" content="https://static.ustw.watch/public-image/website/preview.png" />
        <meta property="og:description" content={i18n.strings.landing.aboutDesc} />
      </Head>
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
        {<img style={{ display: 'none' }} src='/assets/banner.png' alt='US Taiwan Watch' />}
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
              <Typography component="h1" variant="h4" gutterBottom>
                {i18n.strings.brand.fullName}
              </Typography>
              <Typography variant="h6" paragraph>
                {i18n.strings.header.subtitle}
              </Typography>
              {/* <Link variant="subtitle1" href="#">
                Learn more
              </Link> */}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Section id="about">
        <Grid container>
          <Grid item md={8} sm={12} xs={12}>
            <Typography variant="h5" component="h1" gutterBottom sx={{
              paddingBottom: 3,
            }}>
              {i18n.strings.header.about}
            </Typography>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Typography variant="h6" paragraph>
                {i18n.strings.landing.aboutDesc}
                {/* <p>美國台灣觀測站為美國註冊的 501c(3) 非營利組織，致力於透過公民力量強化台美關係，並促進民眾有品質地參與台美外交。</p>
              <p>美國台灣觀測站成立於 2017 年 6 月，起初成員大多為旅美工程師，目標將美國國會的台灣相關法案整理於網站，提供台灣媒體與民眾更認識美國政策制定的平台。2018 年觀測站和長期向美國人教育台灣對美重要性的非營利組織 美台會（American Citizens for Taiwan）合併，並開始拓展其他計畫，包括擴大分析美國外交政策、台美中局勢，以及推出每週 Podcast 討論台美關係。</p>
              <p>目前美國台灣觀測站在社群已累績重要影響力，Facebook 超過 15 萬人追蹤；每週更新的台美新聞 Podcast 下載數累積超過 60 次；Twitter  則為觀測站全英文的內容平台，追蹤者包含美國重要智庫成員、學者和記者。</p>
              <p>2021 年 10 月觀測站出版書籍《為什麼我們要在意美國？》，解釋台美關係歷史、破解台美關係不實資訊、解剖美國政治，並討論重大台美中議題，包括美豬、南海以及科技貿易等的重要議題，與此同時持續藉由實體工作坊連結社群，透過線上平台擴大線上影響力。</p> */}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4} sm={0} xs={0} sx={{
            px: 10,
            paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img src="/assets/watch.png" width="100%" />
          </Grid>
        </Grid>
      </Section>
      <Section id="partners" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <Typography variant="h5" component="h1" gutterBottom id="partners" sx={{
          paddingBottom: 3,
        }}>
          {i18n.strings.header.partners}
        </Typography>
        <Typography variant="h6" paragraph>
          {/* {i18n.strings.landing.partnersDesc} */}
        </Typography>
        <Grid container spacing={6} alignItems="flex-end" sx={{ py: 3 }}>
          {Constants.partners.map((item, i) => (
            <Grid item key={'partner' + i} xs={6} sm={4} md={3}>
              <Link href={item.link} target="_blank">
                <img
                  src={item.logo}
                  alt={item.name}
                  width="100%"
                />
              </Link>
            </Grid>
          ))}
        </Grid>
        {/* <ImageList cols={3} >
          {Constants.partners.map((item) => (
            <ImageListItem sx={{ padding: 1 }}>
              <Link href={item.link} target="_blank">
                <img
                  src={item.logo}
                  alt={item.name}
                  width="100%"
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList> */}
      </Section>
      <Section id="follow">
        <Typography variant="h5" component="h1" gutterBottom sx={{
          paddingBottom: 3,
        }}>
          {i18n.strings.header.follow}
        </Typography>
        <Grid container spacing={5} alignItems="stretch">
          {socialMedias.map((media) => (
            <Grid
              item
              key={media.name}
              xs={12}
              sm={6}
              md={4}
            >
              <Card sx={{ height: '100%' }}>
                <CardActionArea href={media.link} target="_blank" sx={{ height: '100%' }}>
                  <CardHeader
                    avatar={
                      <SocialMediaIcon type={media.type} />
                    }
                    title={media.name}
                    titleTypographyProps={{
                      variant: "h6",
                    }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      color="info.dark"
                    >
                      {i18n.strings.social[media.type]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" paragraph>
        </Typography>
      </Section>
      <Section id="join" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <Grid container>
          <Grid item md={8} sm={12} xs={12}>
            <Typography variant="h5" component="h1" gutterBottom sx={{
              paddingBottom: 3,
            }}>
              {i18n.strings.header.join}
            </Typography>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "end",
            }}>
              <Typography variant="h6" paragraph>
                {i18n.strings.landing.joinDesc}
              </Typography>
              <Link variant="button" href={Constants.links.volunteer} target="_blank" sx={{ width: 'fit-content' }}>
                <Button variant="contained">
                  {i18n.strings.landing.joinButton}
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item md={4} sm={0} xs={0} sx={{
            // paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <img src="/assets/raise.png" width="100%" />
          </Grid>
        </Grid>
      </Section>
      <Section id="donate">
        <Grid container>
          <Grid item md={3} sm={0} xs={0} sx={{ paddingRight: 3 }}>
            <img src="/assets/donate.png" width="100%" />
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <Typography variant="h5" component="h1" gutterBottom sx={{
              paddingBottom: 3,
            }}>
              {i18n.strings.header.donate}
            </Typography>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
            }}>
              <Typography variant="h6" paragraph>
                {i18n.strings.landing.donateDesc}
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: "row",
              }}>
                <Link variant="button" href={Constants.links.donate} target="_blank" >
                  <Button variant="contained">
                    {i18n.strings.landing.donateButton}
                  </Button>
                </Link>
                <Link variant="button" href={Constants.links.donateTW} target="_blank" sx={{ mx: 1 }}>
                  <Button variant="contained">
                    {i18n.strings.landing.donateButtonTW}
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section id="subscribe" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{
          paddingBottom: 3,
        }}>
          {i18n.strings.header.subscribe}
        </Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "end",
        }}>
          <Typography variant="h6" paragraph>
            {i18n.strings.landing.subscribeDesc}
          </Typography>
          <Link variant="button" href={Constants.links.newsletter} target="_blank" sx={{ width: 'fit-content' }}>
            <Button variant="contained">
              {i18n.strings.landing.subscribeButton}
            </Button>
          </Link>
        </Box>
      </Section>
    </Layout >
  );
};

export default Home;
