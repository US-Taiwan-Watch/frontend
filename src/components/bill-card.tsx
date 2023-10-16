import * as React from "react";
import {
  Container,
  Card,
  CardContent,
  Divider,
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
import { BillFieldsFragment } from "../lib/page-graphql/query-bills.graphql.interface";

const stepsForSenate = ['Introduced', 'Pass Senate', 'Pass House', 'Resolving Differences', 'To President', 'Became Law'];
const stepsForHouse = ['Introduced', 'Pass House', 'Pass Senate', 'Resolving Differences', 'To President', 'Became Law'];

export type BillCardProps = {
  id: BillFieldsFragment['id'],
  billNumber: BillFieldsFragment['billNumber'],
  billType: BillFieldsFragment['billType'],
  congress: BillFieldsFragment['congress'],
  title?: BillFieldsFragment['title'],
  introducedDate?: BillFieldsFragment['introducedDate'],
  sponsor?: BillFieldsFragment['sponsor'],
  cosponsorsCount?: BillFieldsFragment['cosponsorsCount'],
  trackers?: BillFieldsFragment['trackers']
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
  const title = props.title;
  const sponsor = props.sponsor;
  let steps = null;
  let selectedStepNum = -1;
  if (props.trackers) {
    steps = billType[0] == 's' ? stepsForSenate : stepsForHouse;
    const latestStep = props.trackers[props.trackers.length - 1].stepName;
    for (let i = 0; i < steps.length; i += 1) {
      const step = steps[i];
      if (latestStep == step) {
        selectedStepNum = i;
      }
    }
  }
  const sponsorNameZh = sponsor?.firstName_zh ? "" + sponsor?.firstName_zh + "．" + sponsor?.lastName_zh : "";
  const sponsorNameEn = "" + sponsor?.firstName + " " + sponsor?.lastName;
  let sponsorAvatar = "X";
  if (sponsor?.firstName && sponsor.lastName) {
    sponsorAvatar = sponsor.firstName?.charAt(0) + sponsor.lastName.charAt(0);
  }
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

            </Box>

            {title && <Box width="100%">
              <Typography variant="h6">
                {title?.text}
              </Typography>
            </Box>}

            <Box width="100%">
              {props.sponsor && <Box>
                <Typography variant="subtitle1">
                  提案人
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{sponsorAvatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={sponsorNameEn +  " " + sponsorNameZh} />
                  </ListItem>
                </List>
              </Box>}
              
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
                    {props.introducedDate && <Box>
                      <Typography variant="subtitle1">
                        提案日
                      </Typography>
                      <Typography variant="body1">
                        {props.introducedDate}
                      </Typography>
                    </Box>}
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    {props.cosponsorsCount && <Box>

                      <Typography variant="subtitle1">
                        連署人數
                      </Typography>
                      <Typography variant="body1">
                        {props.cosponsorsCount}
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
