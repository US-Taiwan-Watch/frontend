import * as React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Stack,
  Grid,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { BillTracker, Member } from "../generated/graphql-types";

const stepsForSenate = ['Introduced', 'Pass Senate', 'Pass House', 'Resolving Differences', 'To President', 'Became Law'];
const stepsForHouse = ['Introduced', 'Pass House', 'Pass Senate', 'Resolving Differences', 'To President', 'Became Law'];

export type BillCardProps = {
  billNumber: number,
  billType: string,
  congress: number,
  title?: string,
  introducedDate?: string,
  tags?: string[],
  sponsor?: Member,
  cosponsorCount?: number,
  cosponsors?: string[],
  trackers?: BillTracker[]
}

/*
const bill = {
  congress: 116,
  billType: "hr",
  billNumber: 2002,
  title: {
    zh: "2019台灣保證法",
    en: "A bill to foster security in Taiwan, and for other purposes.",
    text: "2019台灣保證法"
  },
  introducedDate: "2019-04-01",
  tags: ["tag1", "tag2", "tag3"],
  sponsor: "眾議員 麥克 麥考爾，TX-10",
  steps: ["Introduced", "Passed House", "Passed Senate", "Resolving Differences", "To President", "Became Law"],
  cosponsorsInfo: ["sample1", "sample2", "sample3"]

}
*/

export const BillCard: React.FC<BillCardProps> = (props) => {
  // const keys = props.id;
  const congress = props.congress;
  const billType = props.billType;
  const billNumber = props.billNumber;
  let steps = null;
  let selectedStepNum = -1;
  if (props.trackers) {
    steps = billType[0] == 's' ? stepsForSenate : stepsForHouse;
    const latestStep = props.trackers[props.trackers.length - 1].stepName;
    for (var i = 0; i < steps.length; i += 1) {
      const step = steps[i];
      if (latestStep == step) {
        selectedStepNum = i;
      }
    }
  }
  const sponsorNameZh = props.sponsor?.firstName_zh ? "" + props.sponsor?.firstName_zh + "．" + props.sponsor?.lastName_zh : "";
  const sponsorNameEn = "" + props.sponsor?.firstName + " " + props.sponsor?.lastName;
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          // display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Card
          sx={{
            bgcolor: '#fff',
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              法案基本資訊
            </Typography>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 1,
              }}
            >
              <Stack direction="row" spacing={2}>
                {props.tags && props.tags.map((data) => <Chip label={data} />)}
              </Stack>
            </Box>

            <Box width="100%">
              <Typography variant="h6">
                {props.title}
              </Typography>
            </Box>

            <Box width="100%">
              <Typography variant="subtitle1">
                提案人
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>X</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={props.sponsor?.displayName?.text} />
                </ListItem>

              </List>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box>
                      <Typography variant="subtitle1">
                        國會屆數
                      </Typography>
                      <Typography variant="body1">
                        {congress}
                      </Typography>
                    </Box>

                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <Box>
                      <Typography variant="subtitle1">
                        提案日
                      </Typography>
                      <Typography variant="body1">
                        {props.introducedDate}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    {props.cosponsorCount && <Box>

                      <Typography variant="subtitle1">
                        連署人數
                      </Typography>
                      <Typography variant="body1">
                        {props.cosponsorCount}
                      </Typography>
                    </Box>}
                  </Grid>
                  <Grid item xs={12}>
                    {props.trackers && steps && selectedStepNum != -1 && <Box width="100%" mr={3}>
                      <Typography variant="subtitle1">
                        法案進度
                      </Typography>
                      <Stepper activeStep={selectedStepNum} alternativeLabel sx={{ margin: 2 }}>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>}
                  </Grid>
                </Grid>
              </Box>
            </Box>

          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Box>

    </Container>

  );
};
