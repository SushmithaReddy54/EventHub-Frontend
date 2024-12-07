import axios from "axios";
import { APP_BASE_URL } from "../../api/GlobalUrls";
import { AuthApis } from "../../api/Auth";

export const doAuth = async () => {
    const response = await axios.get(APP_BASE_URL + AuthApis.AuthEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': localStorage.getItem('sessionid')
        },
    })
    return response;
}