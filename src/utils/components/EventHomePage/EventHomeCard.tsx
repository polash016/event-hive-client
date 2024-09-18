import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button as MuiButton,
  Box,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";

const StyledCard = styled(motion(Card))(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  transition: "0.3s",
  minWidth: 300,
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
}));

const CardContentArea = styled(CardContent)({
  padding: "16px 24px",
});

const EventImage = styled(Box)({
  position: "relative",
  height: 200,
  overflow: "hidden",
});

const EventChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: "#4a4a4a",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#5a5a5a",
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "#3a506b",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#5b7193",
  },
  transition: "background-color 0.3s",
}));

const MotionButton = motion(StyledButton);

const EventHomeCard = ({ event }: { event: any }) => {
  return (
    <StyledCard whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
      <EventImage>
        <Image
          src={event.images[0].imageUrl}
          alt={event.name}
          layout="fill"
          objectFit="cover"
        />
      </EventImage>
      <CardContentArea>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {event.name}
        </Typography>
        <InfoItem>
          <CalendarTodayIcon
            fontSize="small"
            sx={{ mr: 1, color: "#bbbbbb" }}
          />
          <Typography variant="body2" color="#bbbbbb">
            {new Date(event.dateTime).toLocaleDateString()}
          </Typography>
        </InfoItem>
        <InfoItem>
          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "#bbbbbb" }} />
          <Typography variant="body2" color="#bbbbbb">
            Starts at {new Date(event.dateTime).toLocaleTimeString()}
          </Typography>
        </InfoItem>
        <InfoItem>
          <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "#bbbbbb" }} />
          <Typography variant="body2" color="#bbbbbb">
            {event.location.city}, {event.location.country}
          </Typography>
        </InfoItem>
        <InfoItem>
          <PeopleIcon fontSize="small" sx={{ mr: 1, color: "#bbbbbb" }} />
          <Typography variant="body2" color="#bbbbbb">
            {event.ticketSold} going
          </Typography>
        </InfoItem>
        <Typography variant="body2" color="#bbbbbb">
          Guest: {event.guest.name}
        </Typography>
        <Box mt={1}>
          {event.categories.slice(0, 2).map((cat: any) => (
            <EventChip
              key={cat.categoryId}
              label={cat.category.name}
              size="small"
            />
          ))}
        </Box>
      </CardContentArea>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <MotionButton
          size="small"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy
        </MotionButton>
        <Link href={`/event/${event.id}`}>
          <MotionButton
            size="small"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Details
          </MotionButton>
        </Link>
      </CardActions>
    </StyledCard>
  );
};

export default EventHomeCard;
