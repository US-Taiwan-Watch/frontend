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
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Breadcrumbs
            separator=">"
            color="text.disabled"
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
          {/* <hr /> */}
          <Box sx={{ my: 4 }}>{props.children}</Box>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginTop: 8,
              px: 1,
            }}
          >
            <Grid item md={3} sm={3} xs={6} sx={{ alignItems: "end" }}>
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
            </Grid>
            <Grid item md={3} sm={3} xs={6}>
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          {props.mediaCard}
        </Grid>
      </Grid>
    </Container>
  );
};
