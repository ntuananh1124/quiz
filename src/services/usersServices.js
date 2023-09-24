import { get, post } from "../untils/request";

export const login = async (email, password) => {
    const result = await get(`users?email=${email}&password=${password}`);
    return result;
}

export const register = async (data) => {
    const result = await post(`users`, data);
    return result;
}

export const checkExist = async (key, value) => {
    const result = await get(`users?${key}=${value}`);
    return result;
}