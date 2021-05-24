import { PhotosType, ProfileType } from './../types/types';
import { instance, APIResponseType } from './api';

type DataPhotoType = {
    photos: PhotosType
}

export const profileAPI = {
    async getUserStatus(userId: number) {
        const response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updateUserStatus(status: string) {
        const response = await instance.put<APIResponseType>(`profile/status`, { status });
        return response.data;
    },
    async getUserProfile(userId: number) {
        const response = await instance.get<ProfileType>(`profile/${userId}`);
        return response.data;
    },
    async savePhoto(filePhoto: any) {
        const formData = new FormData();
        formData.append("image", filePhoto);
        const response = await instance.put<APIResponseType<DataPhotoType>>(`profile/photo`, formData);
        return response.data;
    },
    async saveProfile(profile: ProfileType) {
        const response = await instance.put<APIResponseType>("profile", profile);
        return response.data;
    },
};