export type UserType = {
    id: number,
    name: string,
    status: string | null,
    photos: PhotosType,
    followed: boolean,
    uniqueUrlName: string | null,
}

export type PhotosType = {
    small: string | null,
    large: string | null,
}

export type ProfileType = {
    userId: number ,
    lookingForAJob: boolean ,
    lookingForAJobDescription: string ,
    fullName: string ,
    contacts: ContactsType ,
    photos : PhotosType,   
    aboutMe: string
}

export type ContactsType = {
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