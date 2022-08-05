import type { GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link, LinkProps } from "../components/link";
import { Layout } from "../components/layout";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Grid, Paper } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../components/social-media";
import { Constants } from "../utils/constants";
import { useI18n } from "../context/i18n";
import Head from "next/head";
import { parseStringPromise } from 'xml2js';
import { Banner } from "../components/banner";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  buttons?: LinkProps[];
};

const Section: React.FC<SectionProps> = (props) => (
  <Box id={props.id} className="section" sx={{
    py: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <Container>
      <Grid container>
        {props.left && <Grid item md={4} sm={0} xs={0} sx={{
          display: "flex",
          paddingRight: 3,
          justifyContent: "left",
          alignItems: "center",
        }}>
          {props.left}
        </Grid>}
        <Grid item md={(props.left || props.right) ? 8 : 12} sm={12} xs={12}>
          <Typography variant="h5" component="h1" gutterBottom sx={{
            paddingBottom: 3,
          }}>
            {props.title}
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography variant="h6" paragraph>
              {props.description}
            </Typography>
          </Box>
          {props.children}
          <Box sx={{
            display: "flex",
            flexDirection: "row",
          }}>
            {props.buttons && props.buttons.map((linkProps, i) => (
              <Link key={i} variant="button" {...linkProps} sx={{ marginLeft: i > 0 ? 1 : 0 }} >
                <Button variant="contained">
                  {linkProps.children}
                </Button>
              </Link>
            ))}
          </Box>
        </Grid>
        {props.right && <Grid item md={4} sm={0} xs={0} sx={{
          display: "flex",
          paddingLeft: 3,
          justifyContent: "center",
          alignItems: "center",
        }}>
          {props.right}
        </Grid>}
      </Grid>
    </Container>
  </Box>
)

interface NewsLetter {
  title: string,
  link: string,
  pubDate: string,
  image: string,
  preview: string,
}

interface HomeProps {
  newsLetters: NewsLetter[];
}

const Home: NextPage<HomeProps> = ({ newsLetters }) => {
  // console.log(newsLetters);
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
      <Banner title={i18n.strings.brand.fullName} subtitle={i18n.strings.header.subtitle}>
        <Button variant="contained" color="secondary" href="#donate">
          {i18n.strings.header.donate}
        </Button>
      </Banner>
      <Section id="about"
        title={i18n.strings.header.about}
        description={i18n.strings.landing.aboutDesc}
        right={<img src="/assets/watch.png" width="70%" />}
      /><Section
        id="subscribe"
        title={i18n.strings.header.subscribe}
        description={i18n.strings.landing.subscribeDesc}
        buttons={[{
          children: i18n.strings.landing.subscribeButton,
          href: Constants.links.newsletter,
        }, {
          children: i18n.strings.landing.pastNewsLettersButton,
          href: Constants.links.pastNewsletters,
        }]}
      >
        <Grid container spacing={4}>
          {newsLetters.slice(0, 4).map((letter, i) => (
            <Grid item key={i} xs={12} sm={6} md={3} sx={{ my: 3 }}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardActionArea href={letter.link} target="_blank" sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={letter.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {letter.title}
                    </Typography>
                    <Typography>
                      {letter.preview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
      <Section id="partners" title={i18n.strings.header.partners}>
        <Grid container spacing={6} alignItems="center" sx={{ py: 3 }}>
          {Constants.partners.map((item, i) => (
            <Grid item key={'partner' + i} xs={6} sm={4} md={3}>
              <Link href={item.link} target="_blank">
                <img src={item.logo} alt={item.name} width="100%" />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Section>
      <Section id="follow" title={i18n.strings.header.follow}>
        <Grid container spacing={5} alignItems="stretch">
          {socialMedias.map((media) => (
            <Grid item key={media.name} xs={12} sm={6} md={4}>
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
      </Section>
      <Section id="join"
        title={i18n.strings.header.join}
        description={i18n.strings.landing.joinDesc}
        left={<img src="/assets/raise.png" width="100%" />}
        buttons={[{
          children: i18n.strings.landing.joinButton,
          href: Constants.links.volunteer,
        }]}
      />
      <Section id="donate"
        title={i18n.strings.header.donate}
        description={i18n.strings.landing.donateDesc}
        right={<img src="/assets/donate.png" width="100%" />}
        buttons={[{
          children: i18n.strings.landing.donateButton,
          href: Constants.links.donate,
        },
        {
          children: i18n.strings.landing.donateButtonTW,
          href: Constants.links.donateTW,
        }]}
      />
      <style jsx global>{`
        .section:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout >
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await fetch('https://us1.campaign-archive.com/feed?u=5213dd0ea9106d6a472c8d4ed&id=5bff179a75');
  const text = await response.text();
  const xml = await parseStringPromise(text);
  const letters: NewsLetter[] = xml.rss.channel[0].item.map((item: any) => {
    const matchImg = /<meta property="og:image" content="([^"]*)">/.exec(item.description);
    const matchPreview = /<span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">([^"]*)<\/span>/.exec(item.description);
    return {
      title: item.title[0],
      link: item.link[0],
      pubDate: item.pubDate[0],
      image: matchImg ? matchImg[1] : null,
      preview: matchPreview ? matchPreview[1] : null,
    }
  });
  return {
    props: {
      newsLetters: letters,
    },
    revalidate: 300, // In seconds
  }
}

export default Home;
