import axios from "axios";

const axiosInstance = axios.create({
  "baseURL": process.env.API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(new Error("Client closed request"));
    }
    // TODO: create a log service to log errors
    return Promise.reject((error.response && error.response.data) || error);
  },
);

export default axiosInstance;
