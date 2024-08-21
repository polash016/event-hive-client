import { authKey } from "@/constants/authKey";
import { IErrorResponse, ISuccessResponse } from "@/types";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

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
    };

    return resObj;
  },
  function (error) {
    const errorObj: IErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something Went Wrong",
      errorMessages: error?.response?.data?.message,
    };
    return errorObj;
  }
);

export { axiosInstance };
