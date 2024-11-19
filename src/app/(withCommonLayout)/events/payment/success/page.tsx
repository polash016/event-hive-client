"use client";
import { Box, Button, Icon, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

const PaymentSuccess = () => {
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
          <CheckCircleIcon color="success" sx={{ fontSize: "100px" }} />
        </Typography>
        <Typography
          color="springgreen"
          sx={{ textAlign: "center", fontSize: "30px" }}
        >
          Payment Successful
        </Typography>
      </Box>
      <Typography
        sx={{ textAlign: "center", color: "" }}
        component="a"
        href="/"
      >
        <Button>Go To HomePage</Button>
      </Typography>
    </Box>
  );
};

export default PaymentSuccess;
