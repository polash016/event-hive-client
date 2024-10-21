"use client";
import { isLoggedIn, logOut } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EHButton from "../EHButton";

const AuthButton = () => {
  const isLogged = isLoggedIn();

  const router = useRouter();

  const handleLogOut = () => {
    logOut(router);
  };
  return (
    <>
      {" "}
      {isLogged ? (
        <EHButton
          title="Log Out"
          onClick={handleLogOut}
          sx={{ textTransform: "none" }}
        />
      ) : (
        <EHButton title="Login" component={Link} href="/login" />
      )}
    </>
  );
};
export default AuthButton;
