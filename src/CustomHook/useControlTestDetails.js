import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getControlTestListApi } from '../services/qcService';

export const useControlTestDetails = () => {
    const dispatch = useDispatch();
    const [controlList, setControlList] = useState([])

    useEffect(() => {
        const newData = {
            analyzerId: 1
        }
        dispatch(getControlTestListApi(newData, (res) => {
            setControlList(res)
        }))
    }, [])

    return controlList
}