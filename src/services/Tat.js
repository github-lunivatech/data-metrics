import {
  GetListOfTestToInsertUpdateCutoffTimeAndCriticalValues,
  UpdateCriticalValueAndCutoffTimeofTest,
} from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateFormData";
import { fetch, store } from "../utils/httpUtil";

export const getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi = (
  successCallback
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `GetListOfTestToInsertUpdateCutoffTimeAndCriticalValues`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.TestList);
      } else successCallback([]);
    } catch (error) {}
  };
};

export const UpdateCriticalValueAndCutoffTimeofTests = (
  data,
  successCallback
) => {
  return async (dispatch) => {
    try {
      // console.log(
      //   `${UpdateCriticalValueAndCutoffTimeofTest}?testId=${data.testId}&criticalValue=${data.criticalValue}&cutofftime=${data.cutofftime}&cutoffinHrs=${data.cutoffinHrs}`
      // );
      let urlData = generateUrlEncodedData(data);
      const response = await store(
        `${UpdateCriticalValueAndCutoffTimeofTest}?testId=${data.testId}&criticalValue=${data.criticalValue}&cutofftime=${data.cutofftime}&cutoffinHrs=${data.cutoffinHrs}`,
        urlData
      );
      // console.log(response);
      successCallback(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
};
