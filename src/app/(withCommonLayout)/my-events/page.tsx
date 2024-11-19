"use client";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { jsPDF } from "jspdf";
import { useGetMyEventsQuery } from "@/redux/api/eventApi";
import React from "react";

const MyEvents = () => {
  const { data, isLoading } = useGetMyEventsQuery({});
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const paymentData = data.data;

  const handleDownloadTicket = (data: any) => {
    const doc = new jsPDF();

    // Set the title for the PDF
    doc.setFontSize(20);
    doc.text("Ticket Receipt", 20, 20);

    // Transaction details
    doc.setFontSize(14);
    doc.text(`Transaction ID: ${data.transactionId}`, 20, 40);
    doc.text(`Amount: $${data.amount}`, 20, 50);
    doc.text(`Event: ${data.event.name}`, 20, 60);
    doc.text(
      `Date and Time: ${new Date(data.event.dateTime).toLocaleString()}`,
      20,
      70
    );
    doc.text(
      `Location: ${data.event.location.street}, ${data.event.location.city}, ${data.event.location.country}`,
      20,
      80
    );

    // Add a footer
    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 20, 100);

    // Save the generated PDF
    doc.save("ticket_receipt.pdf");
  };

  return (
    <Container
      style={{
        marginTop: "20%",
        color: "white",
        minHeight: "1000px",
        minWidth: "1000px",
      }}
    >
      <List
        sx={{
          backgroundColor: "#333333",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {paymentData.map((data: any) => (
          <ListItem
            key={data.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              borderBottom: "1px solid #444",
              padding: "15px 0",
            }}
          >
            {/* Event Image */}
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={data.event.images[0].imageUrl}
                alt="Event image"
                sx={{ width: 150, height: 150, marginRight: "20px" }}
              />
            </ListItemAvatar>

            {/* Event Details */}
            <ListItemText
              primary={
                <>
                  <Typography variant="h6" color="#abababab">
                    Name: {data.event.name}
                  </Typography>
                </>
              }
              secondary={
                <Box sx={{ color: "#aaaaaa" }}>
                  <Typography variant="body1" color="#abababab">
                    Transaction ID:{" "}
                    <Typography
                      component="span"
                      variant="body1"
                      color="#abababab"
                    >
                      {data.transactionId}
                    </Typography>
                  </Typography>
                  <Typography variant="body1" color="#abababab">
                    Amount: ${data.amount}
                  </Typography>
                  <Typography variant="body1" color="#abababab">
                    Location: {data.event.location.street},{" "}
                    {data.event.location.city}, {data.event.location.country}
                  </Typography>
                  <Typography variant="body1" color="#abababab">
                    Date and Time:{" "}
                    {new Date(data.event.dateTime).toLocaleString()}
                  </Typography>
                </Box>
              }
            />

            {/* Download Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6200ea",
                "&:hover": { backgroundColor: "#3700b3" },
                marginLeft: "20px",
                my: "auto",
              }}
              onClick={() => handleDownloadTicket(data)}
            >
              Download Ticket
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MyEvents;
