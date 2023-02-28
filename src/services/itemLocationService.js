import { GetLocationDetails, InsertUpdateLocation, GetLocationWiseRemainingStockDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllLocationSuccess } from '../store/slices/locationSlice';

export const getLocationApi = (successCallback, id = 0) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetLocationDetails}?id=${id}`);
            if(response?.status === 200){
                successCallback(response?.data?.LocationDetails);
                dispatch(getAllLocationSuccess(response?.data))
            }
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertLocationApi = (data, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(data)
            const response = await store(InsertUpdateLocation, formData);
            // if(response?.status === 200)
                returnData(response?.data)
            // else
            //     returnData([])
        } catch (error) {

        }

    }
}

export const getLocationReportApi = (successCallback, id = 0) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetLocationWiseRemainingStockDetails}?location=${id}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetLocationWiseRemainingStockDetails);
            }
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}