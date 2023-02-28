import { CarelabBase_Url } from "../constants/url";
import axios from "axios";

export const httpCareLabBase = () => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    // 'Access-Control-Allow-Origin': '*',
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'text/plain',
    // Accept: 'application/json',
  };

  const instance = axios.create({
    baseURL: CarelabBase_Url,
    headers: headers,
    mode: "no-cors",
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    }
  );

  return instance;
};
