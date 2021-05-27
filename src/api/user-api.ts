import { instance, APIResponseType, GetUsersResponseType } from './api';

export const userAPI = {
    async getUsers(currentPage: number, pageSize: number, term = '', friend: null | boolean ) {
        const response = await instance.get<GetUsersResponseType>(
            `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)
        );
        return response.data;
    },
    async unfollowUser(userId: number) {
        const response = await instance.delete<APIResponseType>(`follow/${userId}`);
        return response.data;
    },
    async followUser(userId: number) {
        const response = await instance.post<APIResponseType>(`follow/${userId}`);
        return response.data;
    },
};