import { actions } from './dialogs-reducer';
import dialogsReducer from './dialogs-reducer';

let state = {
    dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Oleg" },
        { id: 3, name: "Aleksej" },
        { id: 4, name: "Svetlana" },
        { id: 5, name: "Nastya" },
    ],
    messages: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Hi!" },
        { id: 3, message: "How are you?" },
        { id: 4, message: "I'm fine, thank you!" },
    ],
};

it('Message length should be increment',() => {
    // 1. Test Data
    let action =  actions.sendMessage('Hi');

    //2. action
    let newState = dialogsReducer(state, action);

    //3.expectation
    expect(newState.messages.length).toBe(5);
})

it('Message text should be correct',() => {
    // 1. Test Data
    let action =  actions.sendMessage('Hi');

    //2. action
    let newState = dialogsReducer(state, action);

    //3.expectation
    expect(newState.messages[4].message).toBe('Hi');
})

it('Message length should be decrement',() => {
    // 1. Test Data
    let action =  actions.deleteMessage(4);

    //2. action
    let newState = dialogsReducer(state, action);

    //3.expectation
    expect(newState.messages.length).toBe(3);
})