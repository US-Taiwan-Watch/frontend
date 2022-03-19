import type { CellPlugin } from "@react-page/editor";

// import css as well. currently, we caannot do this here in the demo project and have moved that to _app.tsx
// see https://github.com/vercel/next.js/issues/19717
import "@react-page/plugins-background/lib/index.css";

// The divider plugin
import divider from "@react-page/plugins-divider";
import "@react-page/plugins-divider/lib/index.css";

// The html5-video plugin
import html5video from "@react-page/plugins-html5-video";
import "@react-page/plugins-html5-video/lib/index.css";

// The image plugin
import "@react-page/plugins-image/lib/index.css";

// The spacer plugin
import spacer from "@react-page/plugins-spacer";
import "@react-page/plugins-spacer/lib/index.css";

// The video plugin
import video from "@react-page/plugins-video";
import "@react-page/plugins-video/lib/index.css";
import { iframePlugin } from "./iframe";
import { defaultSlate } from "./slate";

// Define which plugins we want to use.

export const cellPlugins: CellPlugin[] = [
  defaultSlate as CellPlugin,
  spacer as CellPlugin,
  video as CellPlugin,
  divider,
  iframePlugin as any,
];
