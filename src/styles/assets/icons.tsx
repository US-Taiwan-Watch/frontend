import { SvgIcon, SvgIconProps } from "@mui/material";

export const LightBulbIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
  </SvgIcon>
);

import SvgIconFB from "./icon-fb.svg";
import SvgIconFBBW from "./icon-fb-bw.svg";
import SvgIconIG from "./icon-ig.svg";
import SvgIconIGBW from "./icon-ig-bw.svg";
import SvgIconTwitter from "./icon-tw.svg";
import SvgIconTwitterBW from "./icon-tw-bw.svg";
import SvgIconYT from "./icon-yt.svg";
import SvgIconYTBW from "./icon-yt-bw.svg";
import SvgIconSpotify from "./icon-spotify.svg";
import SvgIconSpotifyBW from "./icon-spotify-bw.svg";

export const SizableSvgIcon = (props: SvgIconProps & { component: any }) => {
  return (
    <SvgIcon
      {...props.component().props}
      {...props}
      sx={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export const IconFB = (props: SvgIconProps) => (
  <SvgIcon component={SvgIconFB} {...props} />
);
export const IconFBBW = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconFBBW} {...props} />
);

export const IconIG = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconIG} {...props} />
);
export const IconIGBW = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconIGBW} {...props} />
);

export const IconTwitter = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconTwitter} {...props} />
);
export const IconTwitterBW = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconTwitterBW} {...props} />
);

export const IconYT = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconYT} {...props} />
);
export const IconYTBW = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconYTBW} {...props} />
);

export const IconSpotify = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconSpotify} {...props} />
);
export const IconSpotifyBW = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconSpotifyBW} {...props} />
);

import SvgIconApplePodcasts from "./icon-apple-podcasts.svg";
export const IconApplePodcasts = (props: SvgIconProps) => (
  <SizableSvgIcon component={SvgIconApplePodcasts} {...props} />
);
