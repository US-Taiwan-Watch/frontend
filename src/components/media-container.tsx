import { SmallCardItem } from "./card-list";
import { Link } from "./link";
import {
  Breadcrumbs,
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MediaCard } from "./media-card";

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
  mediaCard?: React.ReactNode;
};

export const MediaContainer: React.FC<MediaContainer> = (props) => {
  const theme = useTheme();
  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{ marginBottom: 2 }}
          >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            {props.breadcrumbs.map((crumb) => (
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
            {props.title}
          </Typography>
          <hr />
          <Box sx={{ my: 4 }}>{props.children}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ maxWidth: 200 }}>
              {props.prev && (
                <Link href={props.prev.url}>
                  <Typography component="h2" variant="h5">
                    上一篇 <ArrowBackIcon />
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {props.prev.title}
                  </Typography>
                </Link>
              )}
            </Box>
            <Box sx={{ maxWidth: 200 }}>
              {props.next && (
                <Link href={props.next.url}>
                  <Typography component="h2" variant="h5">
                    <ArrowForwardIcon /> 下一篇
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {props.next.title}
                  </Typography>
                </Link>
              )}
            </Box>
          </Box>
          {/* {props.next && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Box sx={{ maxWidth: 200 }}>
                <Link href={props.next.url}>
                  <Typography component="h2" variant="h5">
                    <ArrowForwardIcon /> 下一篇
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {props.next.title}
                  </Typography>
                </Link>
              </Box>
            </Box>
          )}
          {props.next && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Box sx={{ maxWidth: 200 }}>
                <Link href={props.next.url}>
                  <Typography component="h2" variant="h5">
                    <ArrowForwardIcon /> 下一篇
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {props.next.title}
                  </Typography>
                </Link>
              </Box>
            </Box>
          )} */}
        </Grid>
        <Grid item md={3}>
          {props.mediaCard}
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
                image={props.imageSrc || undefined}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} sx={{ px: 2 }}>
              <SmallCardItem
                url="test"
                title="test"
                content="test!"
                displayDate="2022/2/2"
                image={props.imageSrc || undefined}
              />
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
};
