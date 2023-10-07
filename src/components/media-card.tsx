import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { SocialMediaIcon, socialMedias } from "./social-media";

export type MediaCardProps = {
  title: string;
  description: string;
  image: string;
  borderColor?: string;
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
        backgroundColor: alpha(theme.palette.primary.light, 0.32),
        borderRadius: "10px",
        boxShadow: 0,
        width: "100%",
      }}
    >
      <Avatar
        src={props.image}
        sx={{
          width: 120,
          height: 120,
          marginBottom: 2,
          ...(props.borderColor && {
            border: `5px solid ${props.borderColor}`,
            background: props.borderColor,
          }),
        }}
      />
      <Typography component="h6" variant="h6" sx={{ textAlign: "center" }}>
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
            color="primary"
          >
            <SocialMediaIcon size={25} type={media.type} bw={true} />
          </IconButton>
        ))}
      </Box>
    </Paper>
  );
};
