import { get, post } from "../untils/request";

export const postUserData = async (options) => {
    const data = await post(`answers`, options);
    return data;
}

export const getUserAnswer = async (quizId) => {
    const result = await get(`answers/${quizId}`);
    return result
}