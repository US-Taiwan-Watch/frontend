import { Box, Container, Paper } from "@mui/material";
import Image from "next/image";
import { SocialMediaGroup } from "./social-media";
import { Copyright } from "./copyright";


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
          <Image src="/assets/logo-long.png" width={200} height={34} />
        </Box>
        <SocialMediaGroup />
      </Container>

      <Copyright color={"green"} />
    </Paper>
  </>
);
