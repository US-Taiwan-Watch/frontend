import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { SocialMediaIcon, socialMedias } from "./social-media";
import { Copyright } from "./copyright";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Constants } from "../utils/constants";
import { NavBar } from "./header";

export const Footer: React.FC<{ draftMode?: boolean }> = ({ draftMode }) => {
  const theme = useTheme();
  if (draftMode) {
    return (
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          boxShadow: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "30vh",
            width: "100%",
            backgroundImage: "url(/assets/footer-bg.svg)",
            backgroundSize: "100% 100%",
            paddingBottom: 5,
          }}
        >
          <Grid container height="100%">
            <Grid item md={3} sm={3} xs={0}></Grid>
            <Grid
              item
              md={6}
              sm={6}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  my: 6,
                }}
              >
                {socialMedias.map((media) => (
                  <IconButton
                    target="_blank"
                    aria-label={media.name}
                    href={media.link}
                    key={media.name}
                    color="primary"
                  >
                    <SocialMediaIcon size={40} type={media.type} bw={true} />
                  </IconButton>
                ))}
                <IconButton
                  aria-label="email"
                  color="primary"
                  href={`mailto:${Constants.links.email}`}
                >
                  <EmailRoundedIcon sx={{ width: 35, height: 35 }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NavBar />
              </Box>
            </Grid>
            <Grid
              item
              md={3}
              sm={3}
              xs={0}
              sx={{
                backgroundImage: "url(/assets/raise.png)",
                backgroundPosition: "bottom",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></Grid>
          </Grid>
        </Box>
        <Box
          width={"100%"}
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            py: 1,
          }}
        >
          <Copyright />
        </Box>
      </Paper>
    );
  }
  return (
    <Paper
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 0,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          marginBottom: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ marginRight: 2 }}>
          <Image
            src="/assets/logo-long-white.png"
            width={200}
            height={34}
            alt="US Taiwan Watch"
          />
        </Box>
        {socialMedias.map((media) => (
          <IconButton
            target="_blank"
            aria-label={media.name}
            href={media.link}
            key={media.name}
          >
            <SocialMediaIcon size={30} type={media.type} bw={true} />
          </IconButton>
        ))}
        <IconButton aria-label="email" href={`mailto:${Constants.links.email}`}>
          <EmailRoundedIcon />
        </IconButton>
      </Container>
      <Copyright />
    </Paper>
  );
};
