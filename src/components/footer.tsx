import { Box, Container, IconButton, Paper } from "@mui/material";
import Image from "next/image";
import { SocialMediaIcon, socialMedias } from "./social-media";
import { Copyright } from "./copyright";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

export const Footer: React.FC = () => (
  <>
    <Paper
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        {socialMedias.filter(media => media.type !== 'podcast').map(media => (
          <IconButton aria-label={media.name} href={media.link} key={media.name}>
            <SocialMediaIcon type={media.type} bw={true} />
          </IconButton>
        ))}
        <IconButton aria-label='email' href="mailto:contact@ustw.watch">
          <EmailRoundedIcon />
        </IconButton>
      </Container>
      <Copyright color={"green"} />
    </Paper>
  </>
);
