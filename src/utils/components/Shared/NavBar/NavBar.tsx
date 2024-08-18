"use client";
import assets from "@/assets";
import {
  Button,
  Slide,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function useScrollDirectionTrigger() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return trigger;
}

const NavBar = () => {
  const trigger = useScrollDirectionTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Stack
        py={4}
        px={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#202030"
      >
        <Stack direction="row" gap={2}>
          <Typography component={Link} href="/" fontWeight={600} variant="h5">
            <Image
              src={assets.logo.navBar_logo}
              width={200}
              height={80}
              alt="logo"
            ></Image>

            {/* Event{" "}
            <Box component="span" color="primary.main">
              Hive
            </Box> */}
          </Typography>
        </Stack>
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
    </Slide>
  );
};
export default NavBar;
