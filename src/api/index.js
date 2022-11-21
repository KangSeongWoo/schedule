import axios from 'axios';
import * as Common from '../utils/common.js';

const request = axios.create({
    baseURL :  process.env.API_URL,
    withCredentials : true
})

request.defaults.timeout = 10000;

request.interceptors.request.use(
    config => {
        console.log(config)
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

request.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

export default request