import { isLoggedIn, logOut } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const isLogged = isLoggedIn();
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    router.refresh();
  };
  return (
    <>
      {" "}
      {isLogged ? (
        <Button onClick={handleLogOut} sx={{ textTransform: "none" }}>
          Log Out
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};
export default AuthButton;
