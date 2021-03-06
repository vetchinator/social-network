import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let posts = [
  { id: 1, message: "Hi, are you doing?", likesCount: 15 },
  { id: 2, message: "Hi, i'm learning React", likesCount: 20 },
];

let dialogs = [
  { id: 1, name: "Sasha" },
  { id: 2, name: "Oleg" },
  { id: 3, name: "Aleksej" },
  { id: 4, name: "Svetlana" },
  { id: 5, name: "Nastya" },
];

let messages = [
  { id: 1, message: "Hi!" },
  { id: 2, message: "Hi!" },
  { id: 3, message: "How are you?" },
  { id: 4, message: "I'm fine, thank you!" },
];

ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
