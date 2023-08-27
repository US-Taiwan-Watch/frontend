import {
  IconApplePodcasts,
  IconFB,
  IconFBBW,
  IconIG,
  IconIGBW,
  IconSpotify,
  IconSpotifyBW,
  IconTwitter,
  IconTwitterBW,
  IconYT,
  IconYTBW,
} from "../styles";
import { Constants } from "../utils/constants";
import AppleIcon from "@mui/icons-material/Apple";

export type SocialMediaType = "fb" | "ig" | "tw" | "yt" | "podcast";

type SocialMediaIconProps = {
  bw?: boolean;
  size?: number;
};

type SocialMedia = {
  type: SocialMediaType;
  name: string;
  link: string;
};

export const socialMedias: SocialMedia[] = [
  {
    type: "fb",
    name: "Facebook",
    link: Constants.links.fb,
  },
  {
    type: "ig",
    name: "Instagram",
    link: Constants.links.ig,
  },
  {
    type: "tw",
    name: "Twitter",
    link: Constants.links.twitter,
  },
  {
    type: "yt",
    name: "YouTube",
    link: Constants.links.yt,
  },
  {
    type: "podcast",
    name: "Podcast",
    link: Constants.links.podcast,
  },
];

export const podcastPlatforms = [
  {
    name: "SoundOn",
    icon: (
      <img
        src="/assets/logo-soundon.jpg"
        style={{ height: "20px", borderRadius: "50%" }}
      />
    ),
    link: "https://player.soundon.fm/p/6cdfccc6-7c47-4c35-8352-7f634b1b6f71",
  },
  {
    name: "Spotify",
    icon: <IconSpotify width={20} height={20} />,
    link: "https://open.spotify.com/show/5CnwG4Tfr7YaQ42FETAI5t?si=S_h7O6X6QLOnkUpr03ZGNA&nd=1",
  },
  {
    name: "Apple Podcasts",
    icon: <IconApplePodcasts width={20} height={20} />,
    link: "https://podcasts.apple.com/us/podcast/%E7%BE%8E%E5%9C%8B%E5%8F%B0%E7%81%A3%E8%A7%80%E6%B8%AC%E7%AB%99/id1508245836",
  },
];

export const SocialMediaIconImpl: React.FC<
  { type: SocialMediaType } & SocialMediaIconProps
> = ({ type, bw }) => {
  switch (type) {
    case "fb":
      return bw !== true ? <IconFB /> : <IconFBBW />;
    case "ig":
      return bw !== true ? <IconIG /> : <IconIGBW />;
    case "tw":
      return bw !== true ? <IconTwitter /> : <IconTwitterBW />;
    case "yt":
      return bw !== true ? <IconYT /> : <IconYTBW />;
    case "podcast":
      return bw !== true ? <IconSpotify /> : <IconSpotifyBW />;
  }
};

export const SocialMediaIcon: React.FC<
  { type: SocialMediaType } & SocialMediaIconProps
> = (props) => {
  return (
    <span style={props.size ? { width: props.size, height: props.size } : {}}>
      <SocialMediaIconImpl {...props} />
    </span>
  );
};
