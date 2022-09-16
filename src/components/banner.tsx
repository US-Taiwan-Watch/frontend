import Typography from "@mui/material/Typography";
import { Box, Button, ButtonProps, Grid, Paper } from "@mui/material";
import { Link } from "./link";
import { ReactNode } from "react";

export type BannerProps = {
  title?: string,
  subtitle?: string,
  actions?: CTA[],
};

export type CTA = {
  buttonProps?: ButtonProps,
  text?: string,
  startIcon?: ReactNode,
  url: string,
}

export const Banner: React.FC<BannerProps> = (props) => (
  <Paper
    sx={{
      position: 'relative',
      color: '#fff',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(/assets/banner.png)`,
      borderRadius: 0,
    }}
  >
    {/* Increase the priority of the hero background image */}
    {<img style={{ display: 'none' }} src='/assets/banner.png' alt='US Taiwan Watch' />}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
    />
    <Grid container>
      <Grid item md={11}>
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            pr: { md: 0 },
          }}
        >
          {props.title && <Typography component="h1" variant="h4" gutterBottom>
            {props.title}
          </Typography>}
          {props.subtitle && <Typography variant="h6" paragraph>
            {props.subtitle}
          </Typography>}
          {props.actions && props.actions.map((action, i) => (
            <Box key={i} sx={{ display: 'inline-block' }} marginRight={1} marginTop={1} >
              <Link href={action.url} sx={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" startIcon={action.startIcon} {...action.buttonProps}>
                  {action.text}
                </Button>
              </Link>
            </Box>))}
          {props.children}
        </Box>
      </Grid>
    </Grid>
  </Paper >
);
