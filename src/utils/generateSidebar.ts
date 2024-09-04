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
          path: `${role}/create-admin`,
          icon: AddCircleIcon,
        },
        {
          title: "Organizer",
          path: `${role}/create-organizer`,
          icon: PeopleAltIcon,
        },
        {
          title: "Create Organizer",
          path: `${role}/manage-users`,
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
          title: "Manage Events",
          path: `${role}/manage-events`,
          icon: EventIcon,
        }
      );
      break;

    case USER_ROLE.ATTENDEE:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "My Event",
          path: `${role}/my-event`,
          icon: EventIcon,
        },
        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: PaymentsIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus];
};
