import axios from "axios";
import { authToken } from "../store/user";


export const axiosInstance = axios.create({
    baseURL:"http://localhost:3000/",
    timeout:10000,
    headers:{"X-Custom-Header" : "Footer"},
  })

  axiosInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = authToken;
      console.log({ token });
  
      config.headers["Authorization"] = `Bearer ${token}`;
  
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  

  // / Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
  