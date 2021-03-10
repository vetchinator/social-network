let rerenderEntireTree = () => {} 

let state = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi, are you doing?", likesCount: 15 },
      { id: 2, message: "Hi, i'm learning React", likesCount: 20 },
    ],
    newPostText: '',
  },

  dialogsPage: {
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
    newMessageText: '',
  },

  sidebar: {
    friends: [
      { id: 1, name: "Andrew" },
      { id: 2, name: "Sveta" },
      { id: 3, name: "Aleksej" },
    ],
  },
};

export const addPost = () => {
  let newPost = {
    id: 3,
    message: state.profilePage.newPostText,
    likesCount: 0,
  };

  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = '';
  rerenderEntireTree(state);

};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};

export const addMessage = (message) => {
  let newMessage = {
    id: 5,
    message: state.dialogsPage.newMessageText,
  };
  state.dialogsPage.messages.push(newMessage);
  state.dialogsPage.newMessageText = '';
  rerenderEntireTree(state);
};

export const updateNewMessageText = (newText) => {
  state.dialogsPage.newMessageText = newText;
  rerenderEntireTree(state);
};

export const subscribe = (observe) => {
 rerenderEntireTree = observe;
}

export default state;
