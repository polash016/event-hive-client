import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

const NavBar = () => {
  return (
    <div>
      <Stack
        py={4}
        px={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" component="h1" fontWeight={600}>
          Event{" "}
          <Box component="span" color="primary.main">
            Hive
          </Box>
        </Typography>
        <Stack direction="row" gap={4} justifyContent="space-between">
          <Typography component={Link} href="/home" color="white">
            Home
          </Typography>
          <Typography component={Link} href="/events" color="white">
            Events
          </Typography>
          <Typography component={Link} href="/about" color="white">
            About
          </Typography>
          <Typography component={Link} href="/contact" color="white">
            Contact
          </Typography>
        </Stack>
        <Stack>
          <Button component={Link} href="/login">
            Login
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};
export default NavBar;
