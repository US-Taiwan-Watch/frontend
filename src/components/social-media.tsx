import { IconFB, IconFBBW, IconIG, IconIGBW, IconTwitter, IconTwitterBW, IconYT, IconYTBW } from "../styles";
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
  description: string,
};

export const socialMedias: SocialMedia[] = [
  {
    type: 'fb',
    name: 'Facebook',
    link: Constants.links.fb,
    description: '一些描述一些描述一些描述一些描述一些描述一些描述一些描述',
  },
  {
    type: 'ig',
    name: 'Instagram',
    link: Constants.links.ig,
    description: '一些描述一些描述一些描述一些描述一些描述一些描述一些描述',
  },
  {
    type: 'tw',
    name: 'Twitter',
    link: Constants.links.twitter,
    description: '一些描述一些描述一些描述一些描述一些描述一些描述一些描述',
  },
  {
    type: 'yt',
    name: 'YouTube',
    link: Constants.links.yt,
    description: '一些描述一些描述一些描述一些描述一些描述一些描述一些描述',
  },
  {
    type: 'podcast',
    name: 'Apple Podcast',
    link: Constants.links.podcast,
    description: '一些描述一些描述一些描述一些描述一些描述一些描述一些描述',
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
      return <AppleIcon />;
  }
}
