import Footer from "@/utils/components/Shared/Footer/Footer";
import NavBar from "@/utils/components/Shared/NavBar/NavBar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Footer />
    </div>
  );
};
export default CommonLayout;
