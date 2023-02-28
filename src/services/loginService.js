import { fetch } from '../utils/httpUtil';

export const getLoginApi = (data, successCallback) => {
    return async dispatch => {
        try {
            const response = await fetch(`CheckValidLoginForInventory?username=${data.user}&password=${data.pass}`);
            if(response?.status === 200)
                successCallback(response?.data);
            else
                successCallback([])
        } catch (error) {
            
        }

    }
}