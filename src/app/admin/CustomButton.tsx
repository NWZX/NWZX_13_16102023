'use client';

import { useDataContext } from '@/context/DataContext';
import { ESupportChatMessageStatus, ISupportChat } from '@/interfaces/IUser';

interface ICustomButtonProps {
    supportChat: ISupportChat;
}

export function CustomButton({ supportChat }: ICustomButtonProps) {
    const { setChatBubbleSessionId, setSelectedSupportChat } = useDataContext();
    const color =
        supportChat.status == ESupportChatMessageStatus.NEW
            ? 'lime'
            : supportChat.status == ESupportChatMessageStatus.OPEN
            ? 'orange'
            : 'slate';
    return (
        <button
            className={`w-full p-10 bg-${color}-500 hover:bg-${color}-600 transition-colors duration-300 opacity-80 border-b border-solid border-gray-100`}
            onClick={() => {
                setChatBubbleSessionId(supportChat.id);
                setSelectedSupportChat(supportChat);
            }}
        >
            Ticket : {supportChat.id}
        </button>
    );
}
