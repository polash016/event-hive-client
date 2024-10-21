"use client";

import React from "react";
import { Box } from "@mui/material";
import AllEventsPage from "./components/AllEvents";

const AllEventsSection = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <AllEventsPage></AllEventsPage>
    </Box>
  );
};

export default AllEventsSection;
