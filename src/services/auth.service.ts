import { authKey } from "@/constants/authKey";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorage";
import { deleteCookies } from "./actions/deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const storeUserInfo = (accessToken: string) => {
  return saveToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);

    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const logOut = (router: AppRouterInstance) => {
  removeFromLocalStorage(authKey);
  deleteCookies([authKey, "refreshToken"]);

  router.push("/");
  router.refresh();
};

export const getNewAccessToken = async () => {
  const res = await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_EVENT_HIVE_API_URL}/auth/refresh-token`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  console.log("generete access token", res);

  return res;
};
