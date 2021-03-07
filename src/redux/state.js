import { rerenderEntireTree } from "../render";

let state = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi, are you doing?", likesCount: 15 },
      { id: 2, message: "Hi, i'm learning React", likesCount: 20 },
    ],
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
  },

  sidebar: {
    friends: [
      { id: 1, name: "Andrew" },
      { id: 2, name: "Sveta" },
      { id: 3, name: "Aleksej" },
    ],
  },
};

export let addPost = (postMessage) => {
  let newPost = {
    id: 3,
    message: postMessage,
    likesCount: 0,
  };
  state.profilePage.posts.push(newPost);
  rerenderEntireTree(state);
};

export default state;
