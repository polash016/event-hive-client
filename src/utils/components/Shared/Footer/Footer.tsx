"use client";

import { Box, Container, Typography, Link, Grid } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: "transparent",
      backgroundImage: "linear-gradient(45deg, #1a1a1a, #333333)",
      color: "grey.100",
      py: 10,
    }}
  >
    <Container maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Event Management App. All rights
            reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="nav"
            sx={{
              mt: { xs: 2, md: 0 },
              textAlign: { xs: "center", md: "right" },
            }}
          >
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ mx: 1, "&:hover": { color: "primary.main" } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ mx: 1, "&:hover": { color: "primary.main" } }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ mx: 1, "&:hover": { color: "primary.main" } }}
            >
              Contact Us
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
