"use client";
import { isLoggedIn, logOut } from "@/services/auth.service";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EHButton from "../EHButton";
import { useState } from "react";
import { useGetProfileQuery } from "@/redux/api/userApi";

const AuthButton = () => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const isLogged = isLoggedIn();
  const { data, isLoading } = useGetProfileQuery({});

  const handleLogOut = () => {
    logOut(router);
    router.push("/login");
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {" "}
      {isLogged ? (
        <Box sx={{ flexGrow: 0, mr: 3 }}>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
            >
              <Avatar
                src={data?.data?.profilePhoto || "/default-avatar.png"}
                alt={data?.data?.name}
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem>
              <Typography component={Link} href={`/profile`}>
                Profile
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography component="button" onClick={handleLogOut}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <EHButton title="Login" component={Link} href="/login" />
      )}
    </>
  );
};
export default AuthButton;
