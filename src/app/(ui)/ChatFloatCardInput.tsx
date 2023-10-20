'use client';

import Image from 'next/image';
import { useState } from 'react';
import PocketBase from 'pocketbase';
import { ISupportChatMessage } from '@/interfaces/IUser';
import { useDataContext } from '@/context/DataContext';

interface ChatBubbleProps {
    adminId?: string;
}

const pb = new PocketBase('http://127.0.0.1:8090');

export default function ChatFloatCardInput({ adminId }: ChatBubbleProps) {
    const [inputText, setInputText] = useState<string>('');
    const { sessionId, userId, selectedSupportChat } = useDataContext();

    const sendMessage = async () => {
        if (sessionId) {
            try {
                await pb
                    .collection<ISupportChatMessage>('support_chat_message')
                    .create({
                        support_chat_id: sessionId,
                        message: inputText,
                        user_id: userId,
                        admin_user_id: adminId
                    });
                setInputText('');
                if (adminId && selectedSupportChat?.status == 'new') {
                    await pb.collection('support_chat').update(sessionId, {
                        status: 'open'
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="flex items-center gap-2 justify-between p-4 border-t border-gray-200 dark:border-neutral-800">
            <input
                className="flex-1 rounded-md bg-gray-100 text-black p-2"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
            />
            <button
                className="rounded-md bg-gray-100 p-2 hover:bg-gray-200/50 transition-colors"
                onClick={sendMessage}
            >
                <Image
                    width={24}
                    height={24}
                    src="/images/send.png"
                    alt="Send"
                />
            </button>
        </div>
    );
}
