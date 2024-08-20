import DashboardDrawer from "@/utils/components/Dashboard/DashboardDrawer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardDrawer>{children}</DashboardDrawer>;
};
export default DashboardLayout;
