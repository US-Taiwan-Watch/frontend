import type { NextPage } from "next";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Link } from "../../components/link";
import { Layout } from "../../components/layout";
import { BigCard } from "../../components/big-card";
import { useI18n } from "../../context/i18n";

const Bill: NextPage = () => (
  <BigCard />
);

export default Bill;