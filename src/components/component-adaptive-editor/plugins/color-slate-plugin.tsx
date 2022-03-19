import { ColorPickerField } from "@react-page/editor";
import { pluginFactories } from "@react-page/plugins-slate";
import React from "react";
import { Avatar } from "@mui/material";

export default pluginFactories.createComponentPlugin<{
  color: string;
}>({
  addHoverButton: true,
  addToolbarButton: true,
  type: "Color",
  object: "mark",
  icon: <Avatar src={"/assets/react-page-color-picker.jpg"} />,
  label: "Color",
  Component: "span",
  getStyle: ({ color }) => ({ color }),
  controls: {
    type: "autoform",
    schema: {
      type: "object",
      required: ["color"],
      properties: {
        color: {
          uniforms: {
            component: ColorPickerField,
          },
          default: "rgba(0,0,255,1)",
          type: "string",
        },
      },
    },
  },
});
