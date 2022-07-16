import { Box, Container, IconButton, Paper } from "@mui/material";
import Image from "next/image";
import { SocialMediaIcon, socialMedias } from "./social-media";
import { Copyright } from "./copyright";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Constants } from "../utils/constants";

export const Footer: React.FC = () => (
  <>
    <Paper
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 0,
      }}
    >
      <Container maxWidth="sm" sx={{
        marginBottom: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}>
        <Box sx={{ marginRight: 2 }}>
          <Image src="/assets/logo-long-white.png" width={200} height={34} />
        </Box>
        {socialMedias.map(media => (
          <IconButton target="_blank" aria-label={media.name} href={media.link} key={media.name}>
            <SocialMediaIcon type={media.type} bw={true} />
          </IconButton>
        ))}
        <IconButton aria-label='email' href={`mailto:${Constants.links.email}`}>
          <EmailRoundedIcon />
        </IconButton>
      </Container>
      <Copyright color={"green"} />
    </Paper>
  </>
);
