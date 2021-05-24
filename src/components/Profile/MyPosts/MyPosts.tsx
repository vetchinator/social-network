import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { SubmitHandler, useForm } from "react-hook-form";
import { PhotosType, PostType } from "../../../types/types";

type FormPropType = {
    addPost: (newPostText: string) => void,
}
type FormValueType = {
    addPostText: string,
}
const AddPostForm: React.FC<FormPropType>= (props) => {
    const { register, handleSubmit, reset} = useForm<FormValueType>();
    const onSubmit: SubmitHandler<FormValueType> = (data) => {
        props.addPost(data.addPostText);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea name="addPostText" ref={register}></textarea>
            </div>
            <div>
                <button type="submit">Send post</button>
            </div>
        </form>
    );
};

type PropType = {
    posts: Array<PostType>,
    photos: PhotosType ,
    isOwner: boolean,
    fullName: string | null,
    addPost: (newPostText: string) => void,
    setLike: (id: number, isLiked: boolean, countLike: number) => void
}

const MyPosts: React.FC<PropType> = props => {
    let postElements = [...props.posts].reverse().map((p) => (
        <Post setLike={props.setLike} post={p} key={p.id} photos={props.photos} fullName={props.fullName} />
    ));

    return (
        <div>
            <h2 className={s.title}>My Posts</h2>
            <div className={s.newPost}>
                {props.isOwner && (
                    <div>
                        <AddPostForm addPost={props.addPost} />
                    </div>
                )}
            </div>
            {postElements}
        </div>
    );
};

export default MyPosts;
