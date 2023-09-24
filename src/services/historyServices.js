import { get } from "../untils/request";

export async function getHistory(userId) {
    const result  = await get(`answers?userId=${userId}`);
    return result
}