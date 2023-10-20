'use client';

import ChatMessage from './ChatMessage';
import PocketBase from 'pocketbase';
import { ISupportChatMessage } from '@/interfaces/IUser';
import { useDataContext } from '@/context/DataContext';
import { useEffect, useRef } from 'react';

interface ChatBubbleProps {}

const pb = new PocketBase('http://127.0.0.1:8090');

async function getMessages(sessionId: string) {
    const result = await pb
        .collection<ISupportChatMessage>('support_chat_message')
        .getList(1, 10, {
            filter: `support_chat_id="${sessionId}"`
        });
    return result.items;
}
async function subscribeMessages(sessionId: string, callback: Function) {
    pb.collection<ISupportChatMessage>('support_chat_message').subscribe(
        '*',
        (e) => {
            e.record.support_chat_id == sessionId && callback(e.record);
        }
    );
}
async function unsubscribeMessages() {
    pb.collection<ISupportChatMessage>('support_chat_message').unsubscribe('*');
}

export default function ChatFloatCardMessageContainer({}: ChatBubbleProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { sessionId, messages, setChatBubbleMessages, addChatBubbleMessage } =
        useDataContext();
    useEffect(() => {
        if (sessionId && (!messages || messages.length == 0)) {
            (async () => {
                setChatBubbleMessages(await getMessages(sessionId));
            })();
        }
    }, [sessionId, messages]);
    useEffect(() => {
        if (sessionId) {
            subscribeMessages(sessionId, (e: ISupportChatMessage) => {
                addChatBubbleMessage(e);
                setTimeout(() => {
                    scrollRef.current?.scrollTo({
                        top: scrollRef.current?.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 100);
            });
        }
        return () => {
            unsubscribeMessages();
        };
    }, [sessionId]);

    return (
        <div
            ref={scrollRef}
            className="flex flex-col flex-1 overflow-auto p-4 scrollbar scrollbar-thumb-blue-500 scrollbar-track-transparent"
        >
            <div className="flex flex-col flex-1 gap-2 max-h-64">
                {messages?.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message.message}
                        isReceived={!!message.admin_user_id}
                    />
                ))}
            </div>
        </div>
    );
}
