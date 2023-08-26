import { Avatar, Paper, Typography, useTheme } from "@mui/material";

export const MediaCard: React.FC = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 5,
        py: 4,
        marginBottom: 5,
        backgroundColor: theme.palette.primary.light,
        borderRadius: "10px",
        boxShadow: 0,
      }}
    >
      <Avatar
        alt="觀測站底加辣"
        src="https://static.ustw.watch/public-image/website/podcast.jpg"
        sx={{
          width: "50%",
          height: "50%",
          border: "3px solid white",
        }}
      />
      <Typography component="h6" variant="h6">
        #觀測站底加辣
      </Typography>
      <Typography variant="body1">
        「觀測站底加辣」已推出第三季，每週不間斷地為聽眾帶來台美關係最新動態與分析，並時不時推出專題報導，以訪問來賓包括前參謀總長李喜明、美國聖湯瑪斯大學國際研究葉耀元教授等。謝謝每一位聽眾的陪伴，過去超過
        150 集的 podcast 累績下載超過 100
        萬，收聽地區除了台美外，還包括中國、日本、越南、香港、澳洲等。讓我們繼續用耳朵追時事、破解台美中地緣政治
        主持群：李可心、陳方隅、Jerry、Ledo、Ting
      </Typography>
    </Paper>
  );
};
