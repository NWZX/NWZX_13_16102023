'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import PocketBase from 'pocketbase';
import { ISupportChat, ISupportChatMessage } from '@/interfaces/IUser';
import { useDataContext } from '@/context/DataContext';

interface ChatBubbleProps {
    userId?: string;
}

export default function ChatBubble({ userId }: ChatBubbleProps) {
    const { setChatBubbleToggle } = useDataContext();

    return (
        <button
            className="absolute bottom-0 right-0 rounded-full bg-gray-100 p-5 hover:bg-gray-200/50 transition-colors"
            onClick={() => setChatBubbleToggle(true)}
        >
            <Image width={48} height={48} src="/images/chat.png" alt="Chat" />
        </button>
    );
}
