import React, { useEffect } from "react";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserStatus } from "../../redux/profile/profile-reducer";
import { useHistory, useParams } from "react-router-dom";
import { selectAuthorisedUserId } from "../../redux/selectors/auth-selector";

type PathParamsType = {
    userId: string,
}

const ProfileContainer: React.FC = () => {

    const authorisedUserId = useSelector(selectAuthorisedUserId);
    const dispatch = useDispatch();
    let history = useHistory();
    let params: PathParamsType  = useParams();

    const getUserProfileHandler = (userId: number) => {
        dispatch(getUserProfile(userId));
    }

    const getUserStatusHandler = (userId: number) => {
        dispatch(getUserStatus(userId));
    }

    const refreshProfile = () => {
        
        let userId: number | null = +params.userId;
        if (!userId) {
            userId = authorisedUserId;
            if (!userId) {
                history.push("/login");
            }
        }
        if (userId) {
            getUserProfileHandler(userId);
            getUserStatusHandler(userId);
        }
    }

    useEffect(() => {
        refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params.userId])

    return <Profile isOwner={!params.userId} />;
}

export default ProfileContainer;
