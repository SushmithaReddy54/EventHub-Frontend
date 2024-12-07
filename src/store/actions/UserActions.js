import axios from "axios";
import { APP_BASE_URL } from "../../api/GlobalUrls";
import { UserApis } from "../../api/User";

export const getUserProfile = async (data) => {
    const response = await axios.get(APP_BASE_URL + UserApis.getUserProfileEndPoint, {
        params: {
            userId: data
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const updateUserProfile = async (data) => {
    const response = await axios.put(APP_BASE_URL + UserApis.updateUserProfileEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}

export const changePassword = async (data) => {
    const response = await axios.post(APP_BASE_URL + UserApis.changePasswordEndpoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}