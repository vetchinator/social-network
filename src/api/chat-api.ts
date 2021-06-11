let subscribers = {
    'message-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

const closeHandler = () => {
    notifySubscribersAboutStatusChanged('close');
    setTimeout(createChannel, 3000);
};
const openHandler = () => {
    notifySubscribersAboutStatusChanged('ready');
};
const errorHandler = () => {
    notifySubscribersAboutStatusChanged('error');
    console.error('Some error occured. Refresh page')
};

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach((s) => s(newMessages));
};

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener("open", openHandler);
    ws?.removeEventListener("error", errorHandler);
}

const notifySubscribersAboutStatusChanged = (status: StatusType) => {
    subscribers['status-changed'].forEach((s) => s(status));
}

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatusChanged('pending');
    ws?.addEventListener("close", closeHandler);
    ws?.addEventListener("message", messageHandler);
    ws?.addEventListener("open", openHandler);
    ws?.addEventListener("error", errorHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['message-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventsNameType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
        };
    },
    unsubscribe(eventName: EventsNameType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
};

type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type StatusType = 'pending' | 'ready' | 'close' | 'error';

type EventsNameType = 'message-received' | 'status-changed'
