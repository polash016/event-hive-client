import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { INavbarItem } from "@/types";
import { usePathname } from "next/navigation";

const SideBarItem = ({ item }: { item: INavbarItem }) => {
  const path = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={path}>
      <ListItem
        disablePadding
        sx={{
          ...(pathName === path
            ? {
                borderRight: "3px solid #1596FD",
                "& svg": {
                  color: "#1596FD",
                },
                mb: 1,
              }
            : {}),
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
export default SideBarItem;
