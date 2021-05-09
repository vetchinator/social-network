export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean,
}

export type PhotosType = {
    small: string | null,
    large: string | null,
}

export type ProfileType = {
    userId: number | null,
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    contacts: ContactType | null,
    photos : PhotosType | null,   
}

type ContactType = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
    website: string | null, 
    youtube: string | null,
    mainLink: string | null
}

export type PostType = {
    id: number,
    message: string,
    countLike: number, 
    isLiked: boolean,
}

export type DialogItemType = {
    id: number,
    name: string
}
export type MessageItemType = {
    id: number,
    message: string
}