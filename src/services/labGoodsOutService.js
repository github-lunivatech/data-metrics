import { InsertUpdateGoodsoutRecord, GetListofGoodsOutRecordByDate, GetGoodsOutCountByDateWiseandItemWise } from '../constants/url';
import { fetch, store } from '../utils/httpUtil';
import { generateUrlEncodedData } from '../utils/generateFormData';
import { getAllGoodsOutSuccess } from '../store/slices/goodsOutSlice';

export const getGoodsOutApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetListofGoodsOutRecordByDate}?fromdate=${data.fromdate}&todate=${data.todate}`);
            if(response?.status === 200){
                dispatch(getAllGoodsOutSuccess(response?.data))
                successCallback(response?.data?.GetListofGoodsOutRecordByDate)
            }else
                successCallback([])
        } catch (error) {
            
        }

    }
}

export const insertGoodsOutApi = (params, returnData) => {
    return async dispatch => {
        try {
            let formData = generateUrlEncodedData(params)
            const response = await store(InsertUpdateGoodsoutRecord, formData);
            // if(response?.status === 200){
            returnData(response?.data);
            // }else{}
        } catch (error) {

        }

    }
}

export const getGoodsOutCountApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`${GetGoodsOutCountByDateWiseandItemWise}?fromdate=${data.fromdate}&todate=${data.todate}&itemid=${data.itemid}`);
            if(response?.status === 200){
                successCallback(response?.data?.GetGoodsOutCountByDateWiseandItemWise)
            }else
                successCallback([])
        } catch (error) {
            
        }

    }
}
