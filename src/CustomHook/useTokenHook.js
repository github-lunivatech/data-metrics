import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from '../store/slices/profileSlice';

export default function useTokenHook() {
    const dispatch = useDispatch();
    const profileReducer = useSelector(state => state.profile);

    const getToken = () => {
        const tokenString = localStorage.getItem('userData');
        if (tokenString || profileReducer?.userData) {
            const userToken = JSON.parse(tokenString);
            if (!profileReducer?.userData) {
                dispatch(storeUserData(userToken))
            }
            return userToken
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
        setToken(userToken.userData);
    };

    return {
        setToken: saveToken,
        token
    }
}