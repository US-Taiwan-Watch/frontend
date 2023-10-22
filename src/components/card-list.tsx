import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useI18n } from "../context/i18n";
import { Link } from "./link";

export type CardProps = {
  url: string;
  title: string;
  content: string;
  displayDate: string;
  image?: string;
};

export const CardListItem: React.FC<CardProps> = (props) => {
  const { i18n } = useI18n();
  return (
    <Box sx={{ my: 3 }}>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <SmallCardItem
          url={props.url}
          title={props.title}
          content={""}
          displayDate={props.displayDate}
          image={props.image}
        />
      </Box>
      <Link
        href={props.url}
        target="_blank"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <CardActionArea
          sx={{
            borderRadius: 1,
          }}
        >
          <Box>
            <Card
              sx={{
                display: "flex",
                boxShadow: "none",
                height: 144,
              }}
            >
              {props.image && (
                <Box sx={{ width: 240, marginRight: "16px" }}>
                  <Box
                    style={{
                      position: "relative",
                      paddingTop: "60%",
                      backgroundPosition: "center",
                      overflow: "hidden",
                      borderRadius: 4,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={props.image}
                      alt={props.title}
                      sx={{ position: "absolute", left: 0, top: 0 }}
                    />
                  </Box>
                </Box>
              )}
              <Box sx={{ py: 0, flex: 1 }}>
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{
                    overflow: "hidden",
                    lineBreak: "anywhere",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    marginBottom: 1,
                  }}
                >
                  {props.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.disabled"
                  paragraph
                  sx={{
                    overflow: "hidden",
                    lineBreak: "anywhere",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {props.content}
                </Typography>
              </Box>
            </Card>
            <Typography
              component="span"
              variant="subtitle1"
              color="text.disabled"
            >
              {props.displayDate}
            </Typography>
          </Box>
        </CardActionArea>
      </Link>
    </Box>
  );
};

export const SmallCardItem: React.FC<CardProps> = (props) => (
  <Link href={props.url} target="_blank">
    <Card sx={{ width: "100%", boxShadow: "none" }}>
      <CardActionArea>
        {props.image && (
          <div
            style={{
              position: "relative",
              paddingTop: "57%",
              backgroundPosition: "center",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <CardMedia
              component="img"
              image={props.image}
              alt={props.title}
              sx={{ position: "absolute", left: 0, top: 0 }}
            />
          </div>
        )}
        <Typography
          sx={{
            display: "flex",
            direction: "rtl",
            borderBottom: "1px solid",
            marginBottom: 1,
          }}
          variant="subtitle1"
          color="text.disabled"
        >
          {props.displayDate}
        </Typography>
        <Typography
          component="h2"
          variant="h6"
          sx={{
            overflow: "hidden",
            lineBreak: "anywhere",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {props.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.disabled"
          paragraph
          sx={{
            overflow: "hidden",
            lineBreak: "anywhere",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {props.content}
        </Typography>
      </CardActionArea>
    </Card>
  </Link>
);

function getGridSize(count: number, size: "sm" | "md") {
  if (size === "md") {
    if (count <= 1) {
      return 12;
    }
    if (count <= 2) {
      return 6;
    }
    if (count <= 3) {
      return 4;
    }
    return 3;
  }
  if (count <= 1) {
    return 12;
  }
  if (count <= 2) {
    return 12;
  }
  if (count <= 3) {
    return 12;
  }
  return 6;
}

export const FeaturedCards: React.FC<{
  cards: CardProps[];
  noBreak?: boolean;
}> = ({ cards, noBreak }) => (
  <Grid container spacing={4}>
    {cards.map((card, i) => (
      <Grid
        item
        key={i}
        xs={12}
        sm={getGridSize(cards.length, "sm")}
        md={getGridSize(cards.length, "md")}
        sx={{
          my: 3,
          display: {
            xs: noBreak && i > 0 ? "none" : "block",
            sm: noBreak && i > 0 ? "none" : "block",
            md: "block",
          },
        }}
      >
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardActionArea
            href={card.url}
            target="_blank"
            sx={{ height: "100%" }}
          >
            {card.image && (
              <CardMedia component="img" image={card.image} alt="random" />
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2">
                {card.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.disabled"
                sx={{ paddingBottom: 2 }}
              >
                {card.displayDate}
              </Typography>
              <Typography>{card.content}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export const CardList: React.FC<{ cards: CardProps[] }> = ({ cards }) => (
  <Container>
    {cards.map((card) => (
      <CardListItem key={card.url} {...card} />
    ))}
  </Container>
);
