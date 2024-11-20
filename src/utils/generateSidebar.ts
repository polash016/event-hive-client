import { USER_ROLE } from "@/constants/role";
import { INavbarItem, IUserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventIcon from "@mui/icons-material/Event";
import PaymentsIcon from "@mui/icons-material/Payments";

export const generateSidebar = (role: IUserRole): INavbarItem[] => {
  const roleMenus: INavbarItem[] = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: PeopleAltIcon,
        },
        {
          title: "Admin",
          path: `${role}/admin`,
          icon: AddCircleIcon,
        },
        {
          title: "Organizer",
          path: `${role}/organizer`,
          icon: PeopleAltIcon,
        }
      );

      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: PeopleAltIcon,
        },
        {
          title: "Admin",
          path: `${role}/admin`,
          icon: AddCircleIcon,
        },
        {
          title: "Organizer",
          path: `${role}/organizer`,
          icon: PeopleAltIcon,
        }
      );
      break;

    case USER_ROLE.ORGANIZER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Event",
          path: `${role}/event`,
          icon: EditCalendarIcon,
        },
        {
          title: "Category",
          path: `${role}/category`,
          icon: EventIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus];
};
