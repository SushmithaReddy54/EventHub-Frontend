import axios from "axios";
import { APP_BASE_URL } from "../../api/GlobalUrls";
import { PreLoginApi } from "../../api/PreLoginApis";

export const doLogin = async (data) => {
  const response = await axios.post(
    APP_BASE_URL + PreLoginApi.LoginEndPoint,
    data
  );
  return response;
};

export const doLogout = async (data) => {
  const response = await axios.post(
    APP_BASE_URL + PreLoginApi.LogoutEndPoint,
    String(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const forgetPassword = async (emailId) => {
  const response = await axios.get(
    `${APP_BASE_URL}${PreLoginApi.ForgetPasswordEndPoint}/${emailId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const resetPassword = async (id, token, password) => {
  const response = await axios.post(
    `${APP_BASE_URL}${PreLoginApi.ResetPasswordEndPoint}/${id}/${token}`,
    { password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const signUpUser = async (data) => {
  const response = await axios.post(
    APP_BASE_URL + PreLoginApi.SignUpEndPoint,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
