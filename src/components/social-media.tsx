import { IconFB, IconFBBW, IconIG, IconIGBW, IconSpotify, IconSpotifyBW, IconTwitter, IconTwitterBW, IconYT, IconYTBW } from "../styles";
import { Constants } from "../utils/constants";
import AppleIcon from '@mui/icons-material/Apple';

export type SocialMediaType = 'fb' | 'ig' | 'tw' | 'yt' | 'podcast';

type SocialMediaIconProps = {
  bw?: boolean,
}

type SocialMedia = {
  type: SocialMediaType,
  name: string,
  link: string,
};

export const socialMedias: SocialMedia[] = [
  {
    type: 'fb',
    name: 'Facebook',
    link: Constants.links.fb,
  },
  {
    type: 'ig',
    name: 'Instagram',
    link: Constants.links.ig,
  },
  {
    type: 'tw',
    name: 'Twitter',
    link: Constants.links.twitter,
  },
  {
    type: 'yt',
    name: 'YouTube',
    link: Constants.links.yt,
  },
  {
    type: 'podcast',
    name: 'Podcast',
    link: Constants.links.podcast,
  },
]

export const SocialMediaIcon: React.FC<{ type: SocialMediaType } & SocialMediaIconProps> = ({ type, bw }) => {
  switch (type) {
    case 'fb':
      return bw !== true ? <IconFB /> : <IconFBBW />;
    case 'ig':
      return bw !== true ? <IconIG /> : <IconIGBW />;
    case 'tw':
      return bw !== true ? <IconTwitter /> : <IconTwitterBW />;
    case 'yt':
      return bw !== true ? <IconYT /> : <IconYTBW />;
    case 'podcast':
      return bw !== true ? <IconSpotify /> : <IconSpotifyBW />;
  }
}
