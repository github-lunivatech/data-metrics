import { GetReagentUsedForControlByDate, InsertUpdateControlReagentDetails } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllreagentSuccess } from '../store/slices/reagentSlice';

export const getReagentUsedApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetReagentUsedForControlByDate}?fromdate=${data.fromdate}&todate=${data.todate}`);
            if (response?.status === 200){
                successCallback(response?.data?.GetReagentUsedForControlByDate);
                dispatch(getAllreagentSuccess(response?.data))
            }
            else
                successCallback([])
        } catch (error) {
        }

    }
}

export const insertReagentUsedApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateControlReagentDetails, formData);
            returnData(response?.data);
        } catch (error) {
        }
    }
}

export const getConsumptionReagentApi = (successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`GetConsumptionHeadOfReagent`);
            if (response?.status === 200){
                successCallback(response?.data?.ItemGategory);
            }
            else
                successCallback([])
        } catch (error) {
        }

    }
}