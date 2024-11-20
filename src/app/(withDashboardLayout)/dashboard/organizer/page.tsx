"use client";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import { useGetOrganizerStatsQuery } from "@/redux/api/organizerApi";

const OrganizerDashBoard = () => {
  const { data, isLoading } = useGetOrganizerStatsQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    totalRevenue,
    currentMonthRevenue,
    totalSuccessfulTransactions,
    totalTicketSold,
  } = data?.data;

  // Styled components
  const DashboardContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    minHeight: "screen",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  const StatCard = styled(Card)(({ color }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: color,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
    textAlign: "center",
    color: "#fff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    },
  }));

  return (
    <DashboardContainer>
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          mb={4}
        >
          Organizer Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Total Revenue */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard color="#4CAF50">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Total Revenue
                </Typography>
                <Typography variant="h4">${totalRevenue}</Typography>
              </CardContent>
            </StatCard>
          </Grid>

          {/* Current Month Revenue */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard color="#2196F3">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Current Month Revenue
                </Typography>
                <Typography variant="h4">${currentMonthRevenue}</Typography>
              </CardContent>
            </StatCard>
          </Grid>

          {/* Total Successful Transactions */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard color="#FF9800">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Successful Transactions
                </Typography>
                <Typography variant="h4">
                  {totalSuccessfulTransactions}
                </Typography>
              </CardContent>
            </StatCard>
          </Grid>

          {/* Total Tickets Sold */}
          <Grid item xs={12} sm={6} md={3}>
            <StatCard color="#9C27B0">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Total Tickets Sold
                </Typography>
                <Typography variant="h4">{totalTicketSold}</Typography>
              </CardContent>
            </StatCard>
          </Grid>
        </Grid>
      </Box>
    </DashboardContainer>
  );
};
export default OrganizerDashBoard;
