import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer
} from 'react';
import { ISupportChat, ISupportChatMessage } from '../interfaces/IUser';

interface IDataContext {
    deviceSessionId?: string;
    chatBubbleMessages?: ISupportChatMessage[];
    chatBubbleToggle?: boolean;
    selectedSupportChat?: ISupportChat;
}

const initialState: IDataContext = {
    deviceSessionId: undefined,
    chatBubbleMessages: undefined,
    chatBubbleToggle: false,
    selectedSupportChat: undefined
};

type TActionType =
    | 'add-message'
    | 'set-messages'
    | 'set-session-id'
    | 'set-chat-bubble-toggle'
    | 'set-selected-support-chat';
interface IReducerAction {
    type: TActionType;
    payload?: Partial<IDataContext>;
}

function reducer(state: IDataContext, action: IReducerAction): IDataContext {
    switch (action.type) {
        case 'add-message':
            if (!action.payload?.chatBubbleMessages) return state;
            return {
                ...state,
                chatBubbleMessages: [
                    ...(state.chatBubbleMessages || []),
                    ...action.payload?.chatBubbleMessages
                ]
            };
        case 'set-messages':
            if (!action.payload?.chatBubbleMessages) return state;
            return {
                ...state,
                chatBubbleMessages: action.payload?.chatBubbleMessages
            };
        case 'set-session-id':
            if (!action.payload?.deviceSessionId) return state;
            sessionStorage.setItem(
                'sessionId',
                action.payload?.deviceSessionId
            );
            return {
                ...state,
                deviceSessionId: action.payload?.deviceSessionId
            };
        case 'set-chat-bubble-toggle':
            if (action.payload?.chatBubbleToggle == undefined) return state;
            return {
                ...state,
                chatBubbleToggle: action.payload?.chatBubbleToggle
            };
        case 'set-selected-support-chat':
            if (!action.payload?.selectedSupportChat) return state;
            return {
                ...state,
                selectedSupportChat: action.payload?.selectedSupportChat
            };
        default:
            throw new Error();
    }
}

const DataContext = createContext<
    [IDataContext, (type: TActionType, payload?: Record<string, any>) => void]
>([initialState, () => {}]);

/**
 * Provider for the Data Fetching Method
 * @param param0 {apiRoute?: string; children: ReactNode}
 * @returns {JSX.Element}
 */
export const DataContextProvider = ({
    children
}: {
    children: ReactNode;
    apiRoute?: string;
}): JSX.Element => {
    const [data, dispatchData] = useReducer(reducer, {
        ...initialState
    });

    return (
        <DataContext.Provider
            value={[data, (t, p) => dispatchData({ type: t, payload: p })]}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const [context, dispatch] = useContext(DataContext);

    // Check if we have a session id in the context (only one time)
    useEffect(() => {
        if (!context.deviceSessionId) {
            const sessionId = sessionStorage.getItem('sessionId');
            if (sessionId) {
                dispatch('set-session-id', { deviceSessionId: sessionId });
            }
        }
        return () => {};
    }, []);

    const addChatBubbleMessage = (message: ISupportChatMessage) => {
        dispatch('add-message', { chatBubbleMessages: [message] });
    };
    const setChatBubbleSessionId = (sessionId: string) => {
        dispatch('set-session-id', { deviceSessionId: sessionId });
    };
    const setChatBubbleMessages = (messages: ISupportChatMessage[]) => {
        dispatch('set-messages', { chatBubbleMessages: messages });
    };
    const setChatBubbleToggle = (toggle: boolean) => {
        dispatch('set-chat-bubble-toggle', { chatBubbleToggle: toggle });
    };
    const setSelectedSupportChat = (supportChat: ISupportChat) => {
        dispatch('set-selected-support-chat', {
            selectedSupportChat: supportChat
        });
    };

    return {
        chatBubbleToggle: context.chatBubbleToggle,
        messages: context.chatBubbleMessages,
        sessionId: context.deviceSessionId,
        userId: undefined,
        selectedSupportChat: context.selectedSupportChat,
        addChatBubbleMessage,
        setChatBubbleSessionId,
        setChatBubbleMessages,
        setChatBubbleToggle,
        setSelectedSupportChat
    };
};
