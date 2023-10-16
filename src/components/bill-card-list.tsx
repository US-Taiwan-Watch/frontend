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
import { BillCard, BillCardProps } from "./bill-card";

export const BillCardListItem: React.FC<BillCardProps> = (props) => {
  const { i18n } = useI18n();
  const url = `/bill/${props.id}`
  return (
    <CardActionArea
      href={url}
      target="_blank"
    >
      <BillCard
          id={props.id}
          billNumber={props.billNumber}
          billType={props.billType}
          congress={props.congress}
          title={props.title}
          introducedDate={props.introducedDate || undefined}
          sponsor={props.sponsor || undefined}
          cosponsorsCount={props.cosponsorsCount || undefined}
          trackers={props.trackers || undefined}
        ></BillCard>
    </CardActionArea>
  )
}

export const BillCardList: React.FC<{ cards: BillCardProps[] }> = ({ cards }) => (
  <Container>
    {cards.map((card) => (
      <BillCardListItem key={card.id} {...card} />
    ))}
  </Container>
)