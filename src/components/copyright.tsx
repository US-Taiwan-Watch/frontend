import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "./link";

export const Copyright: React.FC = () => (
  <Box>
    <Typography variant="body2" align="center">
      {"© "}
      <Link color="inherit" href=".">
        U.S. Taiwan Watch
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  </Box>
);
