import { GetItemSourceDetails, InsertUpdateItemSource } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllNewItemSourceSuccess } from '../store/slices/itemSourceSlice';

export const getItemSourceDetApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetItemSourceDetails}`);
            if (response?.status === 200) {
                successCallback(response?.data?.itemsource)
                dispatch(getAllNewItemSourceSuccess(response?.data))
            } else
                successCallback([])
        } catch (error) {

        }

    }
}

export const insertItemSourceDetApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateItemSource, formData);
            returnData(response?.data);
        } catch (error) {

        }

    }
}