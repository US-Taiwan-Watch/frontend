import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { IconFB, LightBulbIcon } from "../styles/assets/icons";

export const ProTip = () => (
  <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
    <IconFB sx={{ verticalAlign: "middle", height: 35, width: 35 }} />
    <LightBulbIcon sx={{ mr: 1, verticalAlign: "middle" }} />
    Pro tip: See more{" "}
    <Link href="https://mui.com/getting-started/templates/">templates</Link> on
    the MUI documentation.
  </Typography>
);
