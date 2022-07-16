import { SvgIcon, SvgIconProps } from "@mui/material";

export const LightBulbIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
  </SvgIcon>
);

import SvgIconFB from "./icon-fb.svg";
import SvgIconFBBW from "./icon-fb-bw.svg";
export const IconFB = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconFB} viewBox="0 0 512 512" {...props} />
);
export const IconFBBW = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconFBBW} viewBox="0 0 512 512" {...props} />
);

import SvgIconIG from "./icon-ig.svg";
import SvgIconIGBW from "./icon-ig-bw.svg";
export const IconIG = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconIG} viewBox="0 0 1005 1005" {...props} />
);
export const IconIGBW = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconIGBW} viewBox="0 0 512 512" {...props} />
);

import SvgIconTwitter from "./icon-tw.svg";
import SvgIconTwitterBW from "./icon-tw-bw.svg";
export const IconTwitter = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconTwitter} viewBox="0 0 512 512" {...props} />
);
export const IconTwitterBW = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconTwitterBW} viewBox="0 0 512 512" {...props} />
);

import SvgIconYT from "./icon-yt.svg";
import SvgIconYTBW from "./icon-yt-bw.svg";
export const IconYT = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconYT} viewBox="0 0 512 512" {...props} />
);
export const IconYTBW = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconYTBW} viewBox="0 0 512 512" {...props} />
);

import SvgIconSpotify from "./icon-spotify.svg";
import SvgIconSpotifyBW from "./icon-spotify-bw.svg";
export const IconSpotify = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconSpotify} viewBox="0 0 128 128" {...props} />
);
export const IconSpotifyBW = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconSpotifyBW} viewBox="0 0 24 24" {...props} />
);
