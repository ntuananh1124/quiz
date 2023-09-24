import { get } from "../untils/request";

export const getQuestions = async (topicId) => {
    const result = await get(`questions?topicId=${topicId}`);
    return result;
}