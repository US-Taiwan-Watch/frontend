import Typography from "@mui/material/Typography";
import { Box, Grid, Paper } from "@mui/material";

export type BannerProps = {
  title: string,
  subtitle?: string,
  children?: React.ReactNode,
};

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
      <Grid item md={6}>
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            pr: { md: 0 },
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            {props.title}
          </Typography>
          <Typography variant="h6" paragraph>
            {props.subtitle}
          </Typography>
          {props.children}
        </Box>
      </Grid>
    </Grid>
  </Paper>
);
