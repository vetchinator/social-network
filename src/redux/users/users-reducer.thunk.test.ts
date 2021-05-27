import { actions, unfollow, requestUsers } from './users-reducer';
import { follow } from './users-reducer';
import { userAPI } from './../../api/user-api';
import { APIResponseType, ResultCodeEnum, GetUsersResponseType } from './../../api/api';
jest.mock('./../../api/user-api');

let userAPIMock = userAPI as jest.Mocked<typeof userAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.followUser.mockClear();
    userAPIMock.unfollowUser.mockClear();
    userAPIMock.getUsers.mockClear();
})

const result: APIResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
}

test('thunk follow success', async () => {
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))
});

test('thunk unfollow success', async () => {
    userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))
});

const resultUsers: GetUsersResponseType = {
    items: [
        {
          "name": "karunny_alex",
          "id": 17362,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "furzeziyda",
          "id": 17361,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "Aleks860924",
          "id": 17360,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "Kakoito34",
          "id": 17359,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "LSchmit",
          "id": 17358,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "mag19",
          "id": 17357,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "Bodrov-Sergey",
          "id": 17356,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "Ivan-1988",
          "id": 17355,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "MajorKonig",
          "id": 17354,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        },
        {
          "name": "polotaranov",
          "id": 17353,
          "uniqueUrlName": null,
          "photos": {
            "small": null,
            "large": null
          },
          "status": null,
          "followed": false
        }
      ],
    totalCount: 10,
    error: ''
}
userAPIMock.getUsers.mockReturnValue(Promise.resolve(resultUsers));
test('request users success', async () => {
    userAPIMock.getUsers.mockReturnValue(Promise.resolve(resultUsers));
    const thunk = requestUsers(1, 10, {term: '', friend: null} );
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(7);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUsers([]));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setCurrentPage(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleIsFetching(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setFilter({term: '', friend: null}));
    expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.toogleIsFetching(false));
    expect(dispatchMock).toHaveBeenNthCalledWith(6, actions.setUsers(resultUsers.items));
    expect(dispatchMock).toHaveBeenNthCalledWith(7, actions.setTotalUsersCount(10));
});

