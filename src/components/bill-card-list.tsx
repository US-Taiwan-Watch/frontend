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
  return (
    <Link href={props.url} sx={{ display: { xs: "none", sm: "block" } }}>
      <CardActionArea>
        <BillCard
            url={`/bill/${props.id}`}
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
    </Link>
  )
}

export const BillCardList: React.FC<{ cards: BillCardProps[] }> = ({ cards }) => (
  <Container>
    {cards.map((card) => (
      <BillCardListItem key={card.url} {...card} />
    ))}
  </Container>
)