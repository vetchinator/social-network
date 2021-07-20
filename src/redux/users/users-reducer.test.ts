import { actions } from './users-reducer';
import usersReducer, { InitialStateType } from "./users-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                "name": "HACKERMAN",
                "id": 0,
                "uniqueUrlName": null,
                "photos": {
                  "small": null,
                  "large": null
                },
                "status": null,
                "followed": true
              },
              {
                "name": "vanish7",
                "id": 1,
                "uniqueUrlName": null,
                "photos": {
                  "small": null,
                  "large": null
                },
                "status": null,
                "followed": true
              },
              {
                "name": "dilekter",
                "id": 2,
                "uniqueUrlName": null,
                "photos": {
                  "small": null,
                  "large": null
                },
                "status": null,
                "followed": false
              },
              {
                "name": "IvanB",
                "id": 3,
                "uniqueUrlName": null,
                "photos": {
                  "small": null,
                  "large": null
                },
                "status": null,
                "followed": false,
              }
        ],
        totalCountUsers: 10,
        pageSize: 21,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [0, 2],
        filter: {
            term: '',
            friend:  null,
        }
    }
})

test('follow success', () => {
    let newState = usersReducer(state, actions.toggleFollow(3));
    expect(newState.users[3].followed).toBeTruthy();
    expect(newState.users[2].followed).toBeFalsy();
})

test('unfollow success', () => {
    let newState = usersReducer(state, actions.toggleFollow(0));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('set users', () => {
    let users = [
        {
            "name": "Shubert",
            "id": 1,
            "photos": {
              "small": null,
              "large": null
            },
            "status": null,
            "uniqueUrlName": null,
            "followed": false
          },
          {
            "name": "Hacker",
            "id": 2,
            "photos": {
              "small": null,
              "large": null
            },
            "uniqueUrlName": null,
            "status": null,
            "followed": false
          }
    ]

    let newState = usersReducer(state, actions.setUsers(users));
    expect(newState.users).toBe(users);
})

test('set current page', () => {
    let newState = usersReducer(state, actions.setCurrentPage(10));
    expect(newState.currentPage).toBe(10);
})

test('set total users count', () => {
    let newState = usersReducer(state, actions.setTotalUsersCount(100));
    expect(newState.totalCountUsers).toBe(100);
})

test('set is fetching', () => {
    let newState = usersReducer(state, actions.toogleIsFetching(true));
    expect(newState.isFetching).toBe(true);
    newState = usersReducer(state, actions.toogleIsFetching(false));
    expect(newState.isFetching).toBe(false);
})

test('add number to followingInProgress', () => {
    let newState = usersReducer(state, actions.toogleFollowingProgress(true, 1));
    expect(newState.followingInProgress).toEqual([0, 2, 1]);
})

test('delete number to followingInProgress', () => {
    let newState = usersReducer(state, actions.toogleFollowingProgress(false, 0));
    expect(newState.followingInProgress).toEqual([2]);
})



