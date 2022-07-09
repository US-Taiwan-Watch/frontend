import { IconButton, SvgIconProps } from "@mui/material";
import { IconFB, IconFBBW, IconIG, IconIGBW, IconTwitter, IconTwitterBW, IconYT, IconYTBW } from "../styles";
import { Constants } from "../utils/constants";

export type SocialMediaType = 'fb' | 'ig' | 'tw' | 'yt';

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
]

export const SocialMediaGroup = (props: SocialMediaIconProps) => (
  <>
    {socialMedias.map(media => (
      <IconButton aria-label={media.name} href={media.link} key={media.name}>
        <SocialMediaIcon type={media.type} bw={props.bw} />
      </IconButton>
    ))}
  </>);


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
  }
}
