import { SmallCardItem } from "./card-list";
import { Link } from "./link";
import {
  Breadcrumbs,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export type MediaContainer = {
  title?: string | null;
  imageSrc?: string | null;
  next?: {
    title: string;
    url: string;
  } | null;
  prev?: {
    title: string;
    url: string;
  } | null;
  breadcrumbs: [{ title: string; url: string }];
};

export const MediaContainer: React.FC<MediaContainer> = (params) => {
  const theme = useTheme();
  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{ marginBottom: 2 }}
          >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            {params.breadcrumbs.map((crumb) => (
              <Link
                underline="hover"
                color="inherit"
                href={crumb.url}
                key={crumb.title}
              >
                {crumb.title}
              </Link>
            ))}
          </Breadcrumbs>
          <Typography component="h4" variant="h4" gutterBottom>
            {params.title}
          </Typography>
          <hr />
          <Box sx={{ my: 4 }}>{params.children}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ maxWidth: 200 }}>
              {params.prev && (
                <Link href={params.prev.url}>
                  <Typography component="h2" variant="h5">
                    上一篇 <ArrowBackIcon />
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {params.prev.title}
                  </Typography>
                </Link>
              )}
            </Box>
            <Box sx={{ maxWidth: 200 }}>
              {params.next && (
                <Link href={params.next.url}>
                  <Typography component="h2" variant="h5">
                    <ArrowForwardIcon /> 下一篇
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {params.next.title}
                  </Typography>
                </Link>
              )}
            </Box>
          </Box>
          {/* {params.next && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Box sx={{ maxWidth: 200 }}>
                <Link href={params.next.url}>
                  <Typography component="h2" variant="h5">
                    <ArrowForwardIcon /> 下一篇
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {params.next.title}
                  </Typography>
                </Link>
              </Box>
            </Box>
          )}
          {params.next && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Box sx={{ maxWidth: 200 }}>
                <Link href={params.next.url}>
                  <Typography component="h2" variant="h5">
                    <ArrowForwardIcon /> 下一篇
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {params.next.title}
                  </Typography>
                </Link>
              </Box>
            </Box>
          )} */}
        </Grid>
        <Grid item md={4}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 5,
              py: 4,
              marginBottom: 5,
              backgroundColor: theme.palette.primary.light,
              borderRadius: "10px",
              boxShadow: 0,
            }}
          >
            <Avatar
              alt="觀測站底加辣"
              src="https://static.ustw.watch/public-image/website/podcast.jpg"
              sx={{
                width: "50%",
                height: "50%",
                border: "3px solid white",
              }}
            />
            <Typography component="h6" variant="h6">
              #觀測站底加辣
            </Typography>
            <Typography variant="body1">
              「觀測站底加辣」已推出第三季，每週不間斷地為聽眾帶來台美關係最新動態與分析，並時不時推出專題報導，以訪問來賓包括前參謀總長李喜明、美國聖湯瑪斯大學國際研究葉耀元教授等。謝謝每一位聽眾的陪伴，過去超過
              150 集的 podcast 累績下載超過 100
              萬，收聽地區除了台美外，還包括中國、日本、越南、香港、澳洲等。讓我們繼續用耳朵追時事、破解台美中地緣政治
              主持群：李可心、陳方隅、Jerry、Ledo、Ting
            </Typography>
          </Paper>
          {/* <Typography component="h5" variant="h5" gutterBottom>
            相關文章
          </Typography>
          <hr />
          <Grid container>
            <Grid item xs={12} sm={6} md={12} sx={{ px: 2 }}>
              <SmallCardItem
                url="test"
                title="test"
                content="test!"
                displayDate="2022/2/2"
                image={params.imageSrc || undefined}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} sx={{ px: 2 }}>
              <SmallCardItem
                url="test"
                title="test"
                content="test!"
                displayDate="2022/2/2"
                image={params.imageSrc || undefined}
              />
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
};
