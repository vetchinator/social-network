const SEND_MESSAGE = "dialog/SEND-MESSAGE";
const DELETE_MESSAGE = "dialog/DELETE_MESSAGE";

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
};

//state.dialogsPage
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 5,
                message: action.newMessageText,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        case DELETE_MESSAGE: {
            return { ...state, messages: state.messages.filter(message => message.id !== action.messageId)}
        }

        default:
            return state;
    }
};

export const sendMessage = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText });
export const deleteMessage = (messageId) => ({ type: DELETE_MESSAGE, messageId });

export default dialogsReducer;
