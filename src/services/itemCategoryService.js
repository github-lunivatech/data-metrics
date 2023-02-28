import { GetItemCategory, InsertUpdateItemCategory } from "../constants/url";
import { fetch, store } from "../utils/httpUtil";
import { generateUrlEncodedData } from "../utils/generateFormData";
import { getAllCategorySuccess } from "../store/slices/categorySlice";

export const getItemCategoryApi = (successCallback, id = 0) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetItemCategory}?id=${id}`);
      if (response?.status === 200) {
        if (id === 0) {
          successCallback(response?.data?.ItemGategory);
        }
        dispatch(getAllCategorySuccess(response?.data));
      } else successCallback([]);
    } catch (error) {}
  };
};

export const insertItemCategoryApi = (data, returnData) => {
  return async (dispatch) => {
    try {
      let formData = generateUrlEncodedData(data);
      const response = await store(InsertUpdateItemCategory, formData);
      // if(response?.status === 200)
      returnData(response?.data);
      // else
      //     returnData([])
    } catch (error) {}
  };
};
