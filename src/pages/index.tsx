import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import { Link } from "../components/link";
import { Layout } from "../components/layout";
import { Button, Card, CardActionArea, CardContent, CardHeader, Container, Grid, ImageList, ImageListItem, Paper } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../components/social-media";
import { Constants } from "../utils/constants";

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

const Home: NextPage = () => (
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
              US Taiwan Watch 美國台灣觀測站
            </Typography>
            <Typography variant="h6" paragraph>
              需要一個副標
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
        <Grid item md={8} sm={11} xs={11}>
          <Typography variant="h5" component="h1" gutterBottom sx={{
            paddingBottom: 3,
          }}>
            關於我們
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography variant="h6" paragraph>
              「US Taiwan Watch 美國台灣觀測站」致力於深化台美關係，透過消弭資訊不對稱，以及提升民眾對於台美事務和國際動態的了解，來降低公民外交的門檻、創造更好的公民外交品質。2022 年觀測站以「拉近距離」作為團隊努力的目標，希望利用成員們在美國的地理優勢，製播更多影音內容，讓台灣觀眾能更貼近美國的社會、文化以及外交現場。
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4} sm={1} xs={1} sx={{
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
        合作夥伴
      </Typography>
      <Typography variant="h6" paragraph>
        We work with blahblah
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
        追蹤我們
      </Typography>
      <Grid container spacing={5} alignItems="flex-end">
        {socialMedias.map((media) => (
          <Grid
            item
            key={media.name}
            xs={12}
            sm={6}
            md={4}
          >
            <Card>
              <CardActionArea href={media.link} target="_blank" >
                <CardHeader
                  avatar={
                    <SocialMediaIcon type={media.type} />
                  }
                  title={media.name}
                  titleTypographyProps={{ variant: "h6" }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                  >
                    {media.description}
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
        <Grid item md={8} sm={11} xs={11}>
          <Typography variant="h5" component="h1" gutterBottom sx={{
            paddingBottom: 3,
          }}>
            加入我們
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "end",
          }}>
            <Typography variant="h6" paragraph>
              文字介紹
            </Typography>
            <Link variant="button" href={Constants.links.volunteer} target="_blank">
              <Button variant="contained">報名成為志工！</Button>
            </Link>
          </Box>
        </Grid>
        <Grid item md={4} sm={1} xs={1} sx={{
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
        <Grid item md={3} sm={1} xs={1} sx={{ paddingRight: 3 }}>
          <img src="/assets/donate.png" width="100%" />
        </Grid>
        <Grid item md={9} sm={11} xs={11}>
          <Typography variant="h5" component="h1" gutterBottom sx={{
            paddingBottom: 3,
          }}>
            支持我們
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
          }}>
            <Typography variant="h6" paragraph>
              lalalalalala
            </Typography>
            <Link variant="button" href={Constants.links.donate} target="_blank">
              <Button variant="contained">前往贊助</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Section>
  </Layout >
);

export default Home;
