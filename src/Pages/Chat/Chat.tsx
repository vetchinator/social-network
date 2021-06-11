import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessageListening, stopMessageListening, ChatMessageType } from "../../redux/chat-reducer";
import { selectMessages, selectStatusChat } from "../../redux/selectors/chat-selector";

const ChatPage: React.FC = () => {
    return (
        <Chat />
    )
}

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessageListening());
        return () => {
            dispatch(stopMessageListening());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Messages />
            <SendMessageForm />
        </div>
    )
}

const Messages: React.FC = () => {
    let messageAnchoreRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    let messages = useSelector(selectMessages);

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchoreRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let target = e.currentTarget;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            setIsAutoScroll(true);
        } else {
            setIsAutoScroll(false);
        }
    }

    return (
        <div style={{ height: '800px', overflowY: 'scroll' }} onScroll={scrollHandler}>
            {messages.map((m, idx) => <Message message={m} key={m.id} />)}
            <div ref={messageAnchoreRef} ></div>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <div>
            <div style={{ textAlign: 'left', paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
                <img style={{ width: '30px', borderRadius: '50%',  }} src={message.photo} alt="avatar" />
                <span style={{paddingLeft: '10px'}}>{message.userName}</span>
            </div>
            <div style={{textAlign: 'left', padding: '10px'}}>{message.message}</div>
            <hr />
        </div>
    );
})

const SendMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    let status = useSelector(selectStatusChat);

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage('');
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
