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

export const BigCard: React.FC = () => (
  <>
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
                {bill.tags.map((data) => <Chip label={data} />)}
              </Stack>
            </Box>

            <Typography variant="h6">
              {bill.title.zh}
            </Typography>

            <Box>

              <Typography variant="subtitle1">
                提案人
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>X</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={bill.sponsor}
                  />
                </ListItem>

              </List>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box>
                    <Typography variant="subtitle1">
                      國會屆數
                    </Typography>
                    <Typography variant="body1">
                      {bill.congress}
                    </Typography>
                  </Box>

                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography variant="subtitle1">
                      提案日
                    </Typography>
                    <Typography variant="body1">
                      {bill.introducedDate}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography variant="subtitle1">
                      連署人數
                    </Typography>
                    <Typography variant="body1">
                      {bill.cosponsorsInfo.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box width="100%" mr={3}>
                    <Typography variant="subtitle1">
                      法案進度
                    </Typography>
                    <Stepper activeStep={1} alternativeLabel sx={{ margin: 2 }}>
                      {bill.steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    {/* <LinearProgress variant="determinate" value={100 / 5} /> */}
                  </Box>
                </Grid>
              </Grid>

            </Box>

          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>

    </Container>

  </>
);
