import slate from "@react-page/plugins-slate";
// import css as well. currently, we caannot do this here in the demo project and have moved that to _app.tsx
// see https://github.com/vercel/next.js/issues/19717
import "@react-page/plugins-slate/lib/index.css";

import React from "react";
import colorSlatePlugin from "./color-slate-plugin";

export const defaultSlate = slate((def) => ({
  ...def,
  plugins: {
    headings: def.plugins.headings,
    emphasize: def.plugins.emphasize,
    link: {
      link: def.plugins.link.link,
    },
    alignment: def.plugins.alignment,
    lists: def.plugins.lists,
    paragraphs: def.plugins.paragraphs,
    color: {
      color: colorSlatePlugin,
    },
  },
}));
