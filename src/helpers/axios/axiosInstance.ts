import { authKey } from "@/constants/authKey";
import { getNewAccessToken } from "@/services/auth.service";
import { IErrorResponse, ISuccessResponse } from "@/types";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import setAccessToken from "../setAccessToken";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

axiosInstance.defaults.headers.post["Accept"] = "application/json";

axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const resObj: ISuccessResponse = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      message: response?.data?.message,
    };

    return resObj;
  },
  async function (error) {
    const config = error.config;

    console.log(error);
    // if (error.code === "ERR_NETWORK") {
    //   saveToLocalStorage(authKey, "");
    //   window.location.href = "/login"; // Redirect to login or handle logout logic
    //   return Promise.reject(error);
    // }
    if (error?.response?.status === 500 && !config.__isRetry) {
      console.log(error);
      config.__isRetry = true; //config.__isRetry // config.sent

      const res = await getNewAccessToken();
      const accessToken = res?.data?.accessToken;

      config.headers["Authorization"] = accessToken;

      saveToLocalStorage(authKey, accessToken);

      setAccessToken(accessToken);

      // return axiosInstance(config);

      try {
        const res = await getNewAccessToken();
        const accessToken = res?.data?.accessToken;

        if (accessToken) {
          config.headers["Authorization"] = accessToken;
          saveToLocalStorage(authKey, accessToken);

          return axiosInstance(config);
        } else {
          throw new Error("Failed to refresh token.");
        }
      } catch (err) {
        console.error("Token refresh failed. Logging out user.", err);
        saveToLocalStorage(authKey, "");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    } else {
      const errorObj: IErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something Went Wrong",
        errorMessages: error?.response?.data?.message,
      };
      return errorObj;
    }
  }
);

export { axiosInstance };
