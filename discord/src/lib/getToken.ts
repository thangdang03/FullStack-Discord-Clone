import axios, { Axios, AxiosDefaults } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { HandelToken } from "./callapi";

const instance = axios.create();
instance.interceptors.request.use(async (config)=>{
    const tokens:JwtPayload = await jwtDecode(config.headers.token);
    const epx:any = tokens.exp;
    const date  = new Date();
    if (date.getTime () >=   epx * 1000) {
        const data = await HandelToken();
        config.headers.token = data;
    }
    return config;
},(error)=>{
    return error;
});


export default instance;