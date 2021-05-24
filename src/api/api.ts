import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "9261c8c8-868c-4e38-8016-84c33dad6b8d",
    },
});

export type APIResponseType <D = {}, RC = ResultCodeEnum> = {
    data: D,
    messages: Array<string>,
    resultCode : RC
}

export type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

 export enum ResultCodeForCapture {
    CaptchaIsRequired = 10
}
