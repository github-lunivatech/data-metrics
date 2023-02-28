import { BASE_URL, TEST_LINK } from '../constants/url';
import axios from 'axios';

export const httpBase = () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/plain',
        // Accept: 'application/json',
    }

    const instance = axios.create({
        baseURL: BASE_URL,
        headers: headers,
        mode: 'no-cors',
    })

    instance.interceptors.response.use(
        response => {
            return response
        },
        error => {
            return error;
        }
    );

    return instance;
}

export const httpBaseNested = () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
    }

    const instance = axios.create({
        baseURL: TEST_LINK,
        headers: headers,
        mode: 'no-cors',
    })

    instance.interceptors.response.use(
        response => {
            return response
        },
        error => {
            return error;
        }
    );

    return instance;
}