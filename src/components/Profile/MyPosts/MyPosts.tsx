import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectFullName, selectPhotoSmall, selectPosts } from "../../../redux/selectors/profile-selector";
import { actions } from "../../../redux/profile/profile-reducer";

type FormPropType = {
    addPost: (newPostText: string) => void,
}

type FormValueType = {
    postText: string,
}

const AddPostForm: React.FC<FormPropType>= (props) => {
    const { register, handleSubmit, reset} = useForm<FormValueType>();
    const onSubmit: SubmitHandler<FormValueType> = (data) => {
        if(data.postText) {
            props.addPost(data.postText);
            reset();
        }
        
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea name="postText" ref={register}></textarea>
            </div>
            <div>
                <button type="submit">Send post</button>
            </div>
        </form>
    );
};

type PropType = {
    isOwner: boolean,
}

export const MyPosts: React.FC<PropType> = props => {

    const photoSmall = useSelector(selectPhotoSmall); 
    const fullName = useSelector(selectFullName); 
    const posts = useSelector(selectPosts);

    const dispatch = useDispatch();

    const addPostHandler = (newPostText: string) => {
        dispatch(actions.addPost(newPostText));
    }

    const setLikeHandler = (id: number, isLiked: boolean, countLike: number) => {
        dispatch(actions.setLike(id, isLiked, countLike));
    }

    let postElements = [...posts].reverse().map((p) => (
        <Post setLike={setLikeHandler} post={p} key={p.id} photo={photoSmall} fullName={fullName} />
    ));

    return (
        <div>
            <h2 className={s.title}>My Posts</h2>
            <div className={s.newPost}>
                {props.isOwner && (
                    <div>
                        <AddPostForm addPost={addPostHandler} />
                    </div>
                )}
            </div>
            {postElements}
        </div>
    );
};