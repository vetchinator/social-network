import { actions } from './profile-reducer';
import usersReducer, { InitialStateType } from "./profile-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        posts: [
            {
                id: 1,
                message: `What Are We Building? React.`,
                countLike: 15,
                isLiked: false,
            },
            { id: 2, message: "Hi, i'm learning React", countLike: 20, isLiked: true },
        ],
        profile: {
            "aboutMe": "reacts",
            "contacts": {
                "facebook": "",
                "website": "",
                "vk": "",
                "twitter": "",
                "instagram": "",
                "youtube": "",
                "github": "",
                "mainLink": ""
            },
            "lookingForAJob": false,
            "lookingForAJobDescription": "Yes",
            "fullName": "Kate ",
            "userId": 12000,
            "photos": {
                "small": "https://social-network.samuraijs.com/",
                "large": "https://social-network.samuraijs.com/"
            }
        },
        status: "",
        serverErrorMessage: "",
    }   
});

test('Add post success', () => {
    let newState = usersReducer(state, actions.addPost('React React React'));
    expect(newState.posts[2]).toEqual({
        id: 3,
        message: `React React React`,
        countLike: 0,
        isLiked: false,
    });
});

const newProfile = {
    "aboutMe": "reactsxdfghjkldfvgbhnjkldfghjkl;/fvgbhnjksdfghjkghjm,k",
    "contacts": {
    "facebook": "",
    "website": "",
    "vk": "",
    "twitter": "",
    "instagram": "",
    "youtube": "",
    "github": "",
    "mainLink": ""
    },
    "lookingForAJob": true,
    "lookingForAJobDescription": "Yes",
    "fullName": "Kate Naumch",
    "userId": 12000,
    "photos": {
        "small": "https://social-network.samuraijs.com/activecontent/images/users/12000/user-small.jpg?v=37",
        "large": "https://social-network.samuraijs.com/activecontent/images/users/12000/user.jpg?v=37"
    }
}

test('set User Profile success', () => {
    let newState = usersReducer(state, actions.setUserProfile(newProfile));
    expect(newState.profile).toEqual(newProfile);
});

test('set User status success', () => {
    let newState = usersReducer(state, actions.setUserStatus('Status'));
    expect(newState.status).toBe('Status');
});

const photos = {
    small: 'http/1234',
    large: 'http/4321'

}
test('set User photos success', () => {
    let newState = usersReducer(state, actions.savePhotoSuccess(photos));
    if (newState.profile) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(newState.profile.photos).toEqual(photos);
    } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(newState.profile).toBeEnabled();
    }
   
});

test('set Server error success', () => {
    let newState = usersReducer(state, actions.setServerError('error'));
        expect(newState.serverErrorMessage).toBe('error');
});

test('set like success', () => {
    let newState = usersReducer(state, actions.setLike( 1, true , 16));
    expect(newState.posts[0]).toEqual({
        id: 1,
        message: `What Are We Building? React.`,
        countLike: 16,
        isLiked: true,
    });

    newState = usersReducer(state, actions.setLike( 2, false , 19));
    expect(newState.posts[1]).toEqual({
        id: 2,
        message: `Hi, i'm learning React`,
        countLike: 19,
        isLiked: false,
    });
});








