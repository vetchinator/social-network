import { instance, APIResponseType, ResultCodeEnum, ResultCodeForCapture } from './api';

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginDataType = {
    userId: number;
}

export const authAPI = {
    async me() {
        const response = await instance.get<APIResponseType<MeResponseDataType>>("auth/me");
        return response.data;
    },
    async login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        const response = await instance.post<APIResponseType<LoginDataType, ResultCodeEnum | ResultCodeForCapture>>("auth/login", { email, password, rememberMe, captcha });
        return response.data;
    },
    async logout() {
        const response = await instance.delete<APIResponseType>("auth/login");
        return response.data;
    },
};