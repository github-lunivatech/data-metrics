import {
  GetControlDetails,
  GetControlTestList,
  GetControlValueByControlTestId,
  GetControlWiseSDMeanCV,
  GetListOfControlvalueByAnalyzerAndDateForLJChart,
  GetListOfControlWiseSD,
  InsertUpdateControlDetails,
  InsertUpdateControlValue,
  InsertUpdateControlWiseSD,
  InsertUpdateControlWiseSDMeanCV,
  InsertUpdateTestControl,
} from "../constants/url";
import {
  getAllSDtestcontrolDatasuccess,
  getAlltestcontrolDatasuccess,
  getAlltestcontrolListsuccess,
  getAlltestcontrolsuccess,
  getAlltestcontroltestListsuccess,
} from "../store/slices/sdControlSlice";
import { generateUrlEncodedData } from "../utils/generateFormData";
import { fetch, store } from "../utils/httpUtil";

export const getControlDetailsApi = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetControlDetails);
      if (response?.status === 200) {
        successCallback(response?.data?.GetControlDetails);
        dispatch(getAlltestcontrolListsuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};

export const getControlValueByControlTestIdApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetControlValueByControlTestId}?analyzerId=${data.analyzerId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.GetControlValueByControlTestId);
        dispatch(getAlltestcontrolDatasuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};

export const getListOfControlWiseSDApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetListOfControlWiseSD}?analyzerId=${data.analyzerId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.GetListOfControlWiseSD);
        dispatch(getAlltestcontrolsuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};

export const getControlTestListApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetControlTestList}?analyzerId=${data.analyzerId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.GetControlTestList);
        dispatch(getAlltestcontroltestListsuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};

export const getControlValueForLJApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetListOfControlvalueByAnalyzerAndDateForLJChart}?analyzerId=${data.analyzerId}&testId=${data.testId}&from=${data.from}&to=${data.to}`
      );
      if (response?.status === 200) {
        successCallback(
          response?.data?.GetListOfControlvalueByAnalyzerAndDateForLJChart
        );
      } else successCallback([]);
    } catch (error) {}
  };
};

export const setControlDetailsApi = (data, successCallback) => {
  return async (dispatch) => {
    const newData = generateUrlEncodedData(data);
    try {
      const response = await store(InsertUpdateControlDetails, newData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) {}
  };
};

export const setControlWiseSDApi = (data, successCallback) => {
  return async (dispatch) => {
    const newData = generateUrlEncodedData(data);
    try {
      const response = await store(InsertUpdateControlWiseSD, newData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) {}
  };
};

export const setTestControlTestApi = (data, successCallback) => {
  return async (dispatch) => {
    const newData = generateUrlEncodedData(data);
    try {
      const response = await store(InsertUpdateTestControl, newData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) {}
  };
};

export const setControlValueApi = (data, successCallback) => {
  return async (dispatch) => {
    const newData = generateUrlEncodedData(data);
    try {
      const response = await store(InsertUpdateControlValue, newData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) {}
  };
};

export const setControlWiseSDMeanCVApi = (data, successCallback) => {
  return async (dispatch) => {
    const newData = generateUrlEncodedData(data);
    try {
      const response = await store(InsertUpdateControlWiseSDMeanCV, newData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) {}
  };
};

export const getControlSDMeanCVApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetControlWiseSDMeanCV}?analyzerId=${data.analyzerId}&testid=${data.testid}&from=${data.from}&to=${data.to}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.GetControlWiseSDMeanCV);
        dispatch(getAllSDtestcontrolDatasuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};
