import {
  InsertUpdateConsumptionGroup,
  GetConsumptionGroup,
  GetConsumptionGroupTestLookUp,
  InsertUpdateConsumptionTestLookUp,
} from "../constants/url";
import { fetch, store } from "../utils/httpUtil";
import { generateUrlEncodedData } from "../utils/generateFormData";
import {
  getAllConsumptionLookSuccess,
  getAllconsumptionSuccess,
} from "../store/slices/consumptionSlice";

export const consumptionGroupApi = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetConsumptionGroup);
      if (response?.status === 200) {
        successCallback(response?.data?.GetConsumptionGroup);
        dispatch(getAllconsumptionSuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};

export const insertUpdateConsumptionGroupApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      let urlData = generateUrlEncodedData(data);
      const response = await store(InsertUpdateConsumptionGroup, urlData);
      successCallback(response?.data);
    } catch (error) {}
  };
};

export const consumptionLookupApi = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetConsumptionGroupTestLookUp);
      if (response?.status === 200) {
        successCallback(response?.data?.GetConsumptionGroupTestLookUp);
        dispatch(getAllConsumptionLookSuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};

export const insertConsumptionLookupApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      let urlData = generateUrlEncodedData(data);
      const response = await store(InsertUpdateConsumptionTestLookUp, urlData);
      successCallback(response?.data);
    } catch (error) {}
  };
};
