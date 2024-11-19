import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const PaymentCancel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        justifyItems: "center",
        alignItems: "center",
      }}
      paddingTop={10}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          <CancelIcon color="error" sx={{ fontSize: "100px" }} />
        </Typography>
        <Typography
          color="orangered"
          sx={{ textAlign: "center", fontSize: "30px" }}
        >
          Payment Cancelled
        </Typography>
      </Box>
      <Typography
        sx={{ textAlign: "center", color: "black" }}
        component="a"
        href="/"
      >
        <Button>Go To HomePage</Button>
      </Typography>
    </Box>
  );
};

export default PaymentCancel;
