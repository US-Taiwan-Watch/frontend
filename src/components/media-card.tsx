import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { SocialMediaIcon, socialMedias } from "./social-media";

export type MediaCardProps = {
  title: string;
  description: string;
};

export const MediaCard: React.FC<MediaCardProps> = (props) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 3,
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
          border: "3px solid #FFD823",
          marginBottom: 2,
        }}
      />
      <Typography component="h6" variant="h6">
        {props.title}
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        {props.description}
      </Typography>
      <Box>
        {socialMedias.map((media) => (
          <IconButton
            target="_blank"
            aria-label={media.name}
            href={media.link}
            key={media.name}
          >
            <SocialMediaIcon size={25} type={media.type} bw={true} />
          </IconButton>
        ))}
      </Box>
    </Paper>
  );
};
