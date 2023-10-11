import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  SocialMediaIcon,
  podcastPlatforms,
  socialMedias,
} from "./social-media";
import { useI18n } from "../context/i18n";

type MediaCardProps = {
  title: string;
  description: string;
  image: string;
  borderColor?: string;
};

const MediaCard: React.FC<MediaCardProps> = (props) => {
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
      <Box>{props.children}</Box>
    </Paper>
  );
};

export const ArticlesMediaCard: React.FC = () => {
  const { i18n } = useI18n();
  return (
    <MediaCard
      title={i18n.strings.articles.mediaCardTitle}
      description={i18n.strings.articles.desc}
      image="/assets/logo-large.png"
      borderColor="white"
    >
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
    </MediaCard>
  );
};

export const PodcastMediaCard: React.FC = () => {
  const { i18n } = useI18n();
  return (
    <MediaCard
      title={i18n.strings.podcast.name}
      description={i18n.strings.social.podcast}
      image="/assets/podcast-no-border.jpg"
      borderColor="#FFD823"
    >
      {podcastPlatforms.map((p) => (
        <IconButton
          sx={{ lineHeight: 0 }}
          target="_blank"
          href={p.link}
          aria-label={p.name}
          key={p.name}
          color="primary"
        >
          <span style={{ width: "25px", height: "25px" }}>{p.icon}</span>
        </IconButton>
      ))}
    </MediaCard>
  );
};