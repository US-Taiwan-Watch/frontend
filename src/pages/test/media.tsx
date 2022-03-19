import * as React from "react";
import { Box, Button } from "@mui/material";
import { NextPage } from "next";
import { MediaProjection } from "../../../common/models";
import { Player } from "../../components/component-player";
import type { PlayerProps } from "../../components/component-player/player";
import _ from "lodash";

const testSuites: { [name: string]: PlayerProps } = {
  mp4: {
    url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    type: "video/mp4",
    projection: MediaProjection.prj_AUTO,
  },
  "360 3D": {
    url: "/media/coriolis_rect.webm",
    type: "video/webm",
    projection: MediaProjection.prj_360_TB,
  },
  "360": {
    url: "/media/eagle-360.mp4",
    type: "video/mp4",
    projection: MediaProjection.prj_360,
  },
  "DRM (DASH)": {
    url: "https://dfb797ad15d282457f293a702af6666c.egress.mediapackage-vod.us-west-1.amazonaws.com/out/v1/6c78acf0e7604553b5c36cb73bdddd14/0d2e91e0e35847e1ba929e0436dbe3bc/bdccb369579b4477b029630b96724793/index.mpd",
    type: "application/dash+xml",
    projection: MediaProjection.prj_AUTO,
    title: "DRM test (DRM test)",
    drmInfo: {
      drmTodayAssetId: "DRM-test-original-Aham-and-Alan",
    },
  },
  "DRM (M3U8)": {
    url: "https://dfb797ad15d282457f293a702af6666c.egress.mediapackage-vod.us-west-1.amazonaws.com/out/v1/6c78acf0e7604553b5c36cb73bdddd14/b4de8b0491aa42b4a2a6d41aabab9d0a/cf0668d294f7431382574fcd07383d6a/index.m3u8",
    type: "application/x-mpegURL",
    projection: MediaProjection.prj_AUTO,
    drmInfo: {
      drmTodayAssetId: "DRM-test-original-Aham-and-Alan",
    },
  },
};

const Page: NextPage = () => {
  const [props, setProps] = React.useState<PlayerProps>();

  if (!props) {
    return (
      <>
        {_.map(testSuites, (val, name) => (
          <Button onClick={() => setProps(val)} variant={"contained"}>
            {name}
          </Button>
        ))}
      </>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", p: 0, m: 0 }}>
      <Player {...props} />
    </Box>
  );
};

export default Page;
