import { InsertUpdateLabGoodReceived, GetGoodReceivedDetailsByDate, GetGoodsInCountByDateWiseandItemWise, GetGoodReceivedDetailsbyItemId } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllGoodsInSucess } from '../store/slices/goodsInSlice';

export const getGoodsReceivedApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetGoodReceivedDetailsByDate}?fromdate=${data.fromdate}&todate=${data.todate}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetGoodReceivedDetailsByDate);
                dispatch(getAllGoodsInSucess(response?.data))
            }else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertGoodsReceivedApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateLabGoodReceived, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}

export const getGoodsInCountApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetGoodsInCountByDateWiseandItemWise}?fromdate=${data.fromdate}&todate=${data.todate}&itemid=${data.itemid}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetGoodsInCountByDateWiseandItemWise)
            }else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const getGoodsInByIdApi = (itemId, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetGoodReceivedDetailsbyItemId}?itemId=${itemId}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetGoodReceivedDetailsbyItemId)
            }else
                successCallback([])
        } catch (error) {
            
        }

    }
}