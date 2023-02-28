import { InsertUpdateItemVsTestRatio, GetListOfItemVsTestRatio, GetListOfTestForInventory, GetListOfGroupTestForInventory } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllItemRatioSuccess } from '../store/slices/itemRatioSlice';

export const getItemVsRatioApi = (successCallback, id = 0) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetListOfItemVsTestRatio}?id=${id}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetListOfItemVsTestRatio);
                dispatch(getAllItemRatioSuccess(response?.data))
            }
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertItemVsRatioApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateItemVsTestRatio, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}

export const getTestListApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetListOfTestForInventory}`);
            if(response?.status === 200)
                successCallback(response?.data?.GetListOfTestForInventory);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}
export const getGroupTestForInventory = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetListOfGroupTestForInventory}`);
            if(response?.status === 200)
                successCallback(response?.data?.GetListOfGroupTest); // key milnu paro
            else
                successCallback([])
        }catch(error){

        }
    }
}