import axios from 'axios';
import queryString from 'query-string';
const REACT_APP_API_URL = 'https://631afc62dc236c0b1ee91590.mockapi.io/ltdung/';
const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});
axiosClient.interceptors.request.use(async (config) => {
// Handle token here ...
  return config;
});
axiosClient.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  // Handle errors
  throw error;
});
export default axiosClient;
