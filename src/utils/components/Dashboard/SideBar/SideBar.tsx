import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Stack } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { generateSidebar } from "@/utils/generateSidebar";
import { IUserRole } from "@/types";
import SideBarItem from "./SideBarItem";
import { getUserInfo } from "@/services/auth.service";

const SideBar = () => {
  const [userRole, setUserRole] = React.useState("");
  React.useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);
  return (
    <Box>
      <Stack justifyContent="center" pl="20px" component={Link} href="/">
        <Image alt="logo" src={assets.logo.dash_logo} width={120} height={20} />
      </Stack>
      <List>
        {generateSidebar(userRole as IUserRole).map((item, index) => (
          <SideBarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};
export default SideBar;
