import axios from "axios";
import { APP_BASE_URL } from "../../api/GlobalUrls";
import { WorkshopApis } from "../../api/Workshop";
import { convertTimetoLocalDateTime } from "../../utils/Common";
export const createWorkshop = async (data, getSession) => {
  try {
    const response = await axios.post(
      APP_BASE_URL + WorkshopApis.createWorkshopEndPoint,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getSession,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllWorkshops = async () => {
  const response = await axios.get(
    APP_BASE_URL + WorkshopApis.getAllWorkshopEndPoint,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const getCreatedWorkshops = async () => {
  const response = await axios.get(
    APP_BASE_URL + WorkshopApis.createdWorkshopsEndPoint,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const registerWorkshop = async (id, token) => {
  const response = await axios.post(
    `${APP_BASE_URL}/workshop/register-for-event/${id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const dropoutWorkshop = async (id, token) => {
  const response = await axios.post(
    `${APP_BASE_URL}/workshop/drop-event/${id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getRegisteredWorkshops = async () => {
  const response = await axios.get(
    APP_BASE_URL + WorkshopApis.registeredWorkshopsEndPoint,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const getRequestedWorkshops = async () => {
  const response = await axios.get(
    APP_BASE_URL + WorkshopApis.requestedWorkshopsEndPoint,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const getWorkshop = async (data) => {
  const response = await axios.get(
    APP_BASE_URL + WorkshopApis.getWorkshopByIdEndPoint,
    {
      params: {
        workshopId: data,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const updateWorkshop = async (data, getSession) => {
  // data.startTime = convertTimetoLocalDateTime(
  //   data.workshopDate,
  //   data.startTime
  // );
  // data.endTime = convertTimetoLocalDateTime(data.workshopDate, data.endTime);
  const response = await axios.post(
    APP_BASE_URL + WorkshopApis.updateWorkshopEndPoint,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: getSession,
      },
    }
  );
  return response;
};

export const deleteWorkshop = async (data) => {
  const response = await axios.delete(
    APP_BASE_URL + WorkshopApis.deleteWorkshopEndPoint+ `/${data}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const requestWorkshop = async (data) => {
  const response = await axios.post(
    APP_BASE_URL + WorkshopApis.requestWorkshopEndPoint,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const enrollWorkshop = async (data) => {
  const response = await axios.post(
    APP_BASE_URL + WorkshopApis.enrollWorkshopEndPoint,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};

export const unEnrollWorkshop = async (data) => {
  const response = await axios.post(
    APP_BASE_URL + WorkshopApis.unEnrollWorkshopEndPoint,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionid"),
      },
    }
  );
  return response;
};
