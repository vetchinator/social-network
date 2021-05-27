import { ProfileType } from './../../types/types';
import { actions, getUserProfile, getUserStatus, updateUserStatus } from './profile-reducer';
import { profileAPI } from './../../api/profile-api';
import { APIResponseType, ResultCodeEnum } from './../../api/api';
jest.mock('./../../api/profile-api');

let profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    profileAPIMock.getUserProfile.mockClear();
})

const result: ProfileType = {
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
}

const resultApi: APIResponseType = {
    data: {},
    messages: [],
    resultCode : ResultCodeEnum.Success
}

test('thunk get user profile success', async () => {
    profileAPIMock.getUserProfile.mockReturnValue(Promise.resolve(result));
    const thunk = getUserProfile(12000);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserProfile(result))
});

test('thunk get user status success', async () => {
    profileAPIMock.getUserStatus.mockReturnValue(Promise.resolve('status'));
    const thunk = getUserStatus(12000);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserStatus('status'))
});

test('thunk update user status success', async () => {
    profileAPIMock.updateUserStatus.mockReturnValue(Promise.resolve(resultApi));
    const thunk = updateUserStatus('Teststatus');
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserStatus('Teststatus'))
});


