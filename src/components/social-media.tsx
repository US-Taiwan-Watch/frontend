import { IconButton, SvgIconProps } from "@mui/material";
import { IconFB, IconIG, IconTwitter, IconYT } from "../styles";

export const SocialMediaGroup = () => (
  <>
    <IconButton aria-label="facebook" href="#">
      <IconFB />
    </IconButton>
    <IconButton aria-label="instagram" href="#">
      <IconIG />
    </IconButton>
    <IconButton aria-label="twitter" href="#">
      <IconTwitter />
    </IconButton>
    <IconButton aria-label="youtube" href="#">
      <IconYT />
    </IconButton>
  </>);
