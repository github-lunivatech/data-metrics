import { GetItemType, InsertUpdateItemType } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllItemTypeSuccess } from '../store/slices/typeSlice';

export const getItemTypeApi = (successCallback, id = 0) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetItemType}?id=${id}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetItemType);
                dispatch(getAllItemTypeSuccess(response?.data))
            }
            else
                successCallback([])
        } catch (error) {

        }

    }
}

export const insertItemTypeApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateItemType, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}