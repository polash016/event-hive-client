"use client";
import { isLoggedIn } from "@/services/auth.service";
import DashboardDrawer from "@/utils/components/Dashboard/DashboardDrawer";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (!isLoggedIn()) {
    router.push("/login");
  }
  return <DashboardDrawer>{children}</DashboardDrawer>;
};
export default DashboardLayout;
