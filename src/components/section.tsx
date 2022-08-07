import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { CTA } from "./banner";
import { Link } from "./link";

type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  actions?: CTA[];
};

export const Section: React.FC<SectionProps> = (props) => (
  <Box id={props.id} className="section" sx={{
    py: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}>
    <Container>
      <Grid container>
        {props.left && <Grid item md={4} sm={0} xs={0} sx={{
          display: "flex",
          paddingRight: 3,
          justifyContent: "left",
          alignItems: "center",
        }}>
          {props.left}
        </Grid>}
        <Grid item md={(props.left || props.right) ? 8 : 12} sm={12} xs={12}>
          <Typography variant="h5" component="h1" gutterBottom sx={{
            paddingBottom: 3,
          }}>
            {props.title}
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography variant="h6" paragraph>
              {props.description}
            </Typography>
          </Box>
          {props.children}
          <Box sx={{
            display: "flex",
            flexDirection: "row",
          }}>
            {props.actions && props.actions.map((action, i) => (
              <Link key={i} variant="button" href={action.url} sx={{ marginLeft: i > 0 ? 1 : 0 }} >
                <Button variant="contained">
                  {action.text}
                </Button>
              </Link>
            ))}
          </Box>
        </Grid>
        {props.right && <Grid item md={4} sm={0} xs={0} sx={{
          display: "flex",
          paddingLeft: 3,
          justifyContent: "center",
          alignItems: "center",
        }}>
          {props.right}
        </Grid>}
      </Grid>
    </Container>
  </Box>
)
