import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useI18n } from "../context/i18n";
import { Link } from "./link";

export type CardProps = {
  url: string,
  title: string,
  content: string,
  displayDate: string,
  image: string,
}

const CardItem: React.FC<CardProps> = (props) => {
  const { i18n } = useI18n();
  return (
    <Grid item xs={12} md={12} sx={{ my: 3 }}>
      <Link href={props.url} sx={{ textDecoration: 'none' }}>
        <CardActionArea>
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ height: '100%', width: 180, display: { xs: 'none', sm: 'block' } }}
              image={props.image}
              alt={props.title}
            />
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

export const CardList: React.FC<{ cards: CardProps[] }> = ({ cards }) => {
  return (
    <Container>
      {cards.map(card => (<CardItem key={card.url} {...card} />))}
    </Container>
  );
};
