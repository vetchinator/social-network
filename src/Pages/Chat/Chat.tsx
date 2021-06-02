import React, { useEffect, useState } from "react";

type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

const ChatPage: React.FC = () => {
    return (
        <Chat/>
    )
}

const Chat: React.FC = () => {
    return (
        <div style={{maxWidth: '800px', margin:'0 auto'}}>
            <Messages/>
            <SendMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) =>{
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, [])
    
    return (
        <div>
            {messages.map((m, idx) => <Message message={m} key={idx}  />)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
                <img style={{ width: '30px', borderRadius: '50%'}} src={message.photo} alt="avatar"/>
                <span>{message.userName}</span>
            </div>
            <div>{message.message}</div>
            <hr/>
        </div>
    );
};

const SendMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if(!message) {
            return;
        }
        wsChannel.send(message);
        setMessage('');
    }

    return (
        <div>
            <div>
                <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
