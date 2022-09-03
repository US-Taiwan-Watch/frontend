import { Backdrop, CircularProgress, SxProps, Theme } from "@mui/material";

type LoadingProps = {
  hide?: boolean,
  overlapping?: boolean,
};

export const Loading: React.FC<LoadingProps> = ({ hide, overlapping }) => {
  let sx: SxProps<Theme> = { color: '#fff' };
  if (overlapping) {
    sx = { ...sx, zIndex: (theme) => theme.zIndex.drawer + 1 };
  }
  return (
    <Backdrop
      sx={sx}
      open={!hide}
    >
      <CircularProgress color="inherit" />
    </Backdrop>);
}