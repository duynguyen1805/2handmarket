require("dotenv").config();
import axios from "axios";
import { error } from "console";
// import _ from 'lodash';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    // Thrown error for request with OK status code
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = (error && error.response && error.response.status) || 500;
    // console.log("check status: ", status);
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        return Promise.reject(error);
      }
      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(error);
      }
      // bad request
      case 400: {
        return Promise.reject(error);
      }
      // not found
      case 404: {
        return Promise.reject(error);
      }
      // conflict
      case 409: {
        return Promise.reject(error);
      }
      // unprocessable
      case 422: {
        return Promise.reject(error);
      }
      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
