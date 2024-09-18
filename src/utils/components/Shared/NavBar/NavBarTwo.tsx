"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import AuthButton from "../../ui/AuthButton/AuthButton";

const NavbarTwo: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{ backgroundColor: "black", width: "100%" }}
    >
      {/* <Toolbar> */}
      <Stack
        py={2}
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
      {/* </Toolbar> */}
    </AppBar>
  );
};

export default NavbarTwo;
