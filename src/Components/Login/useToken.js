import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from '../../store/slices/profileSlice';


export default function useToken() {
    const dispatch = useDispatch();
    const profileReducer = useSelector(state => state.profile);

    const getToken = () => {
        const tokenString = localStorage.getItem('userData');
        if (tokenString || profileReducer?.userData) {
            const userToken = JSON.parse(tokenString);
            if (!profileReducer?.userData) {
                dispatch(storeUserData(userToken.token))
            }
            return true;//userToken?.token
        }

    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + "  "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        const localData = {
            token: userToken,
            createdDateTime: datetime,
        }
        localStorage.setItem('userData', JSON.stringify(localData));
        // localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}