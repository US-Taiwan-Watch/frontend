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
    content: '"XXXXX"',
    color: theme.color.yellow[100],
  },
}));

export const Copyright: React.FC<CopyrightProps> = ({ ...props }) => (
  <StyledRoot {...props}>
    <Typography variant="body2" color="text.secondary" align="center" sx={{}}>
      {"Copyright © "}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  </StyledRoot>
);
