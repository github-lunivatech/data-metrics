import { httpCareLabBase } from "./carelabBaseUtil";

export const fetchCarelab = (url, params) => {
  return httpCareLabBase().get(`/${url}`, params);
};

export const storeCarelab = (url, data) => {
  return httpCareLabBase().post(`/${url}`, data);
};

export const updateCarelab = (url, data) => {
  return httpCareLabBase().put(`/${url}`, data);
};

export const destroyCarelab = (url, id = "") => {
  return httpCareLabBase().delete(`/${url}/${id}`);
};
