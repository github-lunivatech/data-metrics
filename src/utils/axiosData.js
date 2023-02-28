import axios from "axios";
import { BASE_URL } from "../constants/url";

export const axiosData = (data) => {

    axios.post(`${BASE_URL}CreateCreditPartyBill`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'no-cors',
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
}