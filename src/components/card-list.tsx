import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useI18n } from "../context/i18n";
import { Link } from "./link";

export type CardProps = {
  url: string,
  title: string,
  content: string,
  displayDate: string,
  image?: string,
}

const CardItem: React.FC<CardProps> = (props) => {
  const { i18n } = useI18n();
  return (
    <Grid item xs={12} md={12} sx={{ my: 3 }}>
      <Link href={props.url} sx={{ textDecoration: 'none' }}>
        <CardActionArea>
          <Card sx={{ display: 'flex' }}>
            {props.image && <CardMedia
              component="img"
              sx={{ height: '100%', width: 180, display: { xs: 'none', sm: 'block' } }}
              image={props.image}
              alt={props.title}
            />}
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {props.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {props.displayDate}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {props.content}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {i18n.strings.common.cardList.readMore}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  )
}

export const FeaturedCards: React.FC<{ cards: CardProps[] }> = ({ cards }) => (
  <Grid container spacing={4}>
    {cards.map((card, i) => (
      <Grid item key={i} xs={12} sm={6} md={3} sx={{ my: 3 }}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardActionArea href={card.url} target="_blank" sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              image={card.image}
              alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2">
                {card.title}
              </Typography>
              <Typography>
                {card.content}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export const CardList: React.FC<{ cards: CardProps[] }> = ({ cards }) => {
  return (
    <Container>
      {cards.map(card => (<CardItem key={card.url} {...card} />))}
    </Container>
  );
};
