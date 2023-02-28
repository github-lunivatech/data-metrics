import { GetListOfLabItemsDetailsByTypeId, InsertUpdateNewItemsDetails, GetListOfItemsNearToMinQuantity, GetTotalGoodsInAndOutByItem } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllNewItemSuccess } from '../store/slices/newItemSlice';

export const getLabItemsApi = (data, successCallback, id = 0) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(data)
            let newUrl = `${GetListOfLabItemsDetailsByTypeId}?${formData}`
            const response = await fetch(newUrl);
            if (response?.status === 200) {
                if(id === 0)
                    successCallback(response?.data?.GetListOfLabItemsDetailsByTypeId);
                dispatch(getAllNewItemSuccess(response?.data))
            }
            else
                successCallback([])
        } catch (error) {

        }

    }
}

export const insertNewItemDetailsApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateNewItemsDetails, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}

export const getItemNearApi = (successCallback) => {
    return async dispatch => {
        try {
            let newUrl = GetListOfItemsNearToMinQuantity
            const response = await fetch(newUrl);
            if (response?.status === 200) {
                successCallback(response?.data?.GetListOfItemsNearToMinQuantity);
            }
            else
                successCallback([])
        } catch (error) {

        }

    }
}

export const getTotalGoodsInOutApi = (successCallback) => {
    return async dispatch => {
        try {
            let newUrl = GetTotalGoodsInAndOutByItem
            const response = await fetch(newUrl);
            if (response?.status === 200) {
                successCallback(response?.data?.GetTotalGoodsInAndOutByItem);
            }
            else
                successCallback([])
        } catch (error) {

        }

    }
}
