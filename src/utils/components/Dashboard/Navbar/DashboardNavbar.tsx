import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import { logOut } from "@/services/auth.service";
import Link from "next/link";

function DashboardNavbar() {
  const { data: user, isLoading } = useGetProfileQuery("");
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  let role: string;
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    role = "ORGANIZER"; //(user?.data?.role).toLowerCase();
  }

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
  //onClick={handleProfileMenuOpen}
  return (
    <Container>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <Typography>
              Hi,{isLoading ? "Loading..." : user?.data?.name} Welcome To Event
              Hive
            </Typography>
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <Typography>
              Hi,{isLoading ? "Loading..." : user?.data?.name} Welcome To Event
              Hive
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
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
                src={user?.data?.profilePhoto || "/default-avatar.png"}
                alt={user?.data?.name}
                sx={{ width: 40, height: 40 }}
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
              <Typography component={Link} href={`/dashboard/${role}/profile`}>
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
      </Toolbar>
    </Container>
  );
}
export default DashboardNavbar;
