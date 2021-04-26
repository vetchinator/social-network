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
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
    },
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`).then((response) => response.data);
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`).then((response) => response.data);
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`).then((response) => response.data);
    },
};

export const profileAPI = {
    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`).then((response) => response.data);
    },
    updateUserStatus(status) {
        return instance.put(`profile/status`, { status }).then((response) => response.data);
    },
    savePhoto(filePhoto) {
        const formData = new FormData();
        formData.append("image", filePhoto);
        return instance.put(`profile/photo`,  formData ).then((response) => response.data);    
    },
    saveProfile(profile) {
        return instance.put('profile', profile).then((response) => response.data);
    },

};

export const authAPI = {
    me() {
        return instance.get("auth/me");
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post("auth/login", {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete("auth/login");
    },
};


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get("security/get-captcha-url");
    },
    
};