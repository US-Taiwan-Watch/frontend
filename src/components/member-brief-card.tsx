import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';

import {
  MemberQuery,
} from "../lib/page-graphql/query-member.graphql.interface";

import { styled } from '@mui/material/styles';


const ImgDiv = styled('div')({
  width: '175px',
  height: '200px'
});

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
});

export type MemberBriefCardProps = {
  member_data: MemberQuery['member']
}

const MemberBriefCard: React.FC<MemberBriefCardProps> = (props) => {
  const profileUrl = props.member_data?.profilePictureUri ||
                     "https://bioguide.congress.gov/assets/placeholder_square.png"; // TODO: default img
  const engName = (props.member_data?.firstName?.toLocaleUpperCase() || '-') + ', ' + (props.member_data?.lastName || '-');

  let additionName = 
    (props.member_data?.firstName_zh && props.member_data.lastName_zh)? props.member_data.firstName_zh + '・' + props.member_data.lastName_zh : '';
  if (props.member_data?.nickname) {
    additionName += (additionName? ' ':'') + '(' + props.member_data.nickname + ')';
  }
  if (!additionName)  additionName = "　";    // TODO: control layout with grid

  const latestJobRec = props.member_data?.congressRoles[0];
  const latestJob = {
    "jobType" :
      (latestJobRec?.chamber == 's')? "Senator" : ((latestJobRec?.chamber == 'h')? "Representative" : "Unknown Job"),
    "congresNum" :
      (latestJobRec?.congressNumbers.length)? latestJobRec.congressNumbers[latestJobRec.congressNumbers.length - 1] : '?',
    "state" :
      latestJobRec?.state,
    "party" :
      (latestJobRec?.parties.length)? latestJobRec.parties[latestJobRec.parties.length - 1].party : "No Party Data",
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ my: 4, bgcolor: '#fff' }}>
        <CardContent>
          <Grid container spacing={10} >
            <Grid item>
              <ImgDiv>
                <Img src={profileUrl} />
              </ImgDiv>
            </Grid>
            <Grid item sm container direction="column" spacing={3} >
              <Grid item>
                <Typography variant="h4" >
                  {engName}
                </Typography>
                {additionName &&
                  <Typography variant="h5" >
                    {additionName}
                  </Typography>
                }
              </Grid>
              <Grid item>
                <Typography color="text.secondary">
                  Lastest Job Record
                </Typography>
                <Typography variant="h6" >
                  {/* Representative #115  (for Virginia) */}
                  {latestJob.jobType + " #" + latestJob.congresNum
                    + ((latestJob.state)? ("  (for " + latestJob.state + ")"): "")}
                </Typography>
                <Typography variant="h6" >
                  {latestJob.party}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
};

export default MemberBriefCard;