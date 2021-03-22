import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "9261c8c8-868c-4e38-8016-84c33dad6b8d",
    },
});

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
    },
    getUserProfile(userId) {
        return instance
            .get(`profile/${userId}`).then((response) => response.data);
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`).then((response) => response.data);
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`).then((response) => response.data);
    },
};
