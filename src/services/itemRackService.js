import { RackDetailsByLocationId, InsertUpdatRackDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllRackSuccess } from '../store/slices/rackSlice';

export const getRackDetApi = (location, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${RackDetailsByLocationId}?location=${location}`);
            if(response?.status === 200){
                successCallback(response?.data?.RackDetailsByLocationId);
                dispatch(getAllRackSuccess(response?.data))
            }
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertRackDetailsApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdatRackDetails, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}
