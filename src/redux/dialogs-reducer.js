const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

let initialState = {
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
    newMessageText: "",
};

//state.dialogsPage
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 5,
                message: state.newMessageText,
            };
            let stateCopy = { ...state };
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push(newMessage);
            stateCopy.newMessageText = "";
            return stateCopy;
        }

        case UPDATE_NEW_MESSAGE_BODY: {
            let stateCopy = { ...state };
            stateCopy.newMessageText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    newText: text,
});

export default dialogsReducer;
