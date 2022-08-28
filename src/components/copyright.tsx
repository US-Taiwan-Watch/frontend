import * as React from "react";
import MuiLink from "@mui/material/Link";
import { Box, Typography } from "@mui/material";
import { styled } from "../styles/theme";

interface CopyrightProps {
  color: string;
}

const StyledRoot = styled(Box)<CopyrightProps>(({ theme, color }) => ({
  color,
  "&::after": {
    content: '""',
    color: theme.palette.secondary.light,
  },
}));

export const Copyright: React.FC<CopyrightProps> = ({ ...props }) => (
  <StyledRoot {...props}>
    <Typography variant="body2" color="text.secondary" align="center" sx={{}}>
      {"Copyright © "}
      <MuiLink color="inherit" href=".">
        U.S. Taiwan Watch
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  </StyledRoot>
);
