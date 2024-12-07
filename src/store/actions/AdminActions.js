import axios from "axios";
import { AdminApis } from "../../api/Admin";
import { APP_BASE_URL } from "../../api/GlobalUrls";

export const getVenues = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.venuesEndPoint, {headers: {
        'sessionid': localStorage.getItem('sessionid')
    }});
    return response;
}

export const getSkills = async () => {
    const response = await axios.get(APP_BASE_URL + AdminApis.skillsEndPoint);
    return response;
}

export const sendCustomNotifyMessage = async (data) => {
    const response = await axios.post(APP_BASE_URL + AdminApis.sendCustomMessageEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        }
    });
    return response;
}