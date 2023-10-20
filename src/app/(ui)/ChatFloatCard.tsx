'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import PocketBase from 'pocketbase';
import { ISupportChat } from '@/interfaces/IUser';
import { useDataContext } from '@/context/DataContext';
import ChatFloatCardInput from './ChatFloatCardInput';
import ChatFloatCardMessageContainer from './ChatFloatCardMessageContainer';

interface ChatBubbleProps {}

const pb = new PocketBase('http://127.0.0.1:8090');

export default function ChatFloatCard({}: ChatBubbleProps) {
    const {
        chatBubbleToggle,
        userId,
        sessionId,
        setChatBubbleSessionId,
        setChatBubbleToggle
    } = useDataContext();

    useEffect(() => {
        if (chatBubbleToggle && !sessionId) {
            (async () => {
                const result = await pb
                    .collection<ISupportChat>('support_chat')
                    .create({
                        status: 'new',
                        user_id: userId
                    });
                setChatBubbleSessionId(result.id);
            })();
        }
    }, [chatBubbleToggle, sessionId]);

    return (
        <div
            id="floating-chat-card"
            className={`${
                chatBubbleToggle ? 'flex' : 'hidden'
            } absolute bottom-[75px] right-[75px]`}
        >
            <div className="flex flex-col w-full h-full rounded-xl bg-white dark:bg-zinc-800/50">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-800">
                    <h2 className="text-lg font-semibold">Support</h2>
                    <button
                        className="rounded-md bg-gray-100 p-2 hover:bg-gray-200/50 transition-colors"
                        onClick={() => setChatBubbleToggle(false)}
                    >
                        <Image
                            width={24}
                            height={24}
                            src="/images/close.svg"
                            alt="Close"
                        />
                    </button>
                </div>
                <ChatFloatCardMessageContainer />
                <ChatFloatCardInput />
            </div>
        </div>
    );
}
