"use client";
import assets from "@/assets";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { getUserInfo } from "@/services/auth.service";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AuthButton = dynamic(() => import("../../ui/AuthButton/AuthButton"), {
    ssr: false,
  });

  const user = getUserInfo();

  console.log(user);
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{ backgroundColor: "black", width: "100%", py: 2 }}
    >
      <Box>
        <Stack
          py={0}
          px={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          //   bgcolor="#202030"
        >
          <Stack direction="row" gap={2}>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                display: {
                  md: "none",
                },
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
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
          <Stack
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
              },
            }}
            direction="row"
            gap={4}
            justifyContent="space-between"
          >
            <Typography component={Link} href="/" color="white">
              Home
            </Typography>
            <Typography component={Link} href="/events" color="white">
              All Events
            </Typography>
            <Typography component={Link} href="/about" color="white">
              About
            </Typography>

            {user && user?.role === "attendee" ? (
              <Typography component={Link} href="/my-events" color="white">
                My Events
              </Typography>
            ) : (
              user && (
                <Typography
                  component={Link}
                  href={`/dashboard/${
                    user?.role === "super_admin" ? "super-admin" : user?.role
                  }`}
                  color="white"
                >
                  Dashboard
                </Typography>
              )
            )}
          </Stack>
          <Stack>
            <AuthButton />
          </Stack>
        </Stack>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Typography component={Link} href="/" color="white">
              <MenuItem>Home</MenuItem>
            </Typography>
            <Typography component={Link} href="/events" color="white">
              <MenuItem>Events</MenuItem>
            </Typography>
            <Typography component={Link} href="/about" color="white">
              <MenuItem>About</MenuItem>
            </Typography>
            <Typography component={Link} href="/contact" color="white">
              <MenuItem>Contact</MenuItem>
            </Typography>
          </Menu>
        </motion.div>
      </Box>
    </AppBar>
  );
};
export default NavBar;
