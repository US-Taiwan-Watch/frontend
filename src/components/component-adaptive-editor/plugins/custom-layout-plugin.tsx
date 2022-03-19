import type { CellPlugin } from "@react-page/editor";
import React from "react";
import { defaultSlate } from "./slate";

const customLayoutPlugin: CellPlugin<{
  backgroundColor: string;
}> = {
  Renderer: ({ children, data }) => (
    <div
      style={{
        border: "1px solid black",
        backgroundColor: data.backgroundColor,
      }}
    >
      {children}
    </div>
  ),
  createInitialChildren: () => [
    [
      {
        plugin: defaultSlate,
      },
      {
        plugin: defaultSlate,
      },
    ],
  ],

  id: "custom-layout-plugin",
  title: "Custom layout plugin",
  description: "Some custom layout plugin",
  version: 1,
  controls: {
    type: "autoform",
    schema: {
      required: ["backgroundColor"],
      properties: {
        backgroundColor: { type: "string" },
      },
    },
  },
};

export default customLayoutPlugin;
