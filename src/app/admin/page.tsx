import { useState } from 'react';
import ChatFloatCardInput from '../(ui)/ChatFloatCardInput';
import ChatMessage from '../(ui)/ChatMessage';
import ChatMessageContainer from './ChatMessageContainer';
import SupportChatList from './SupportChatList';
import { ISupportChat } from '@/interfaces/IUser';

export default function AdminPage() {
    //Make a dark page sparate in two parts button on left and a chat on right with a message container a input and send button

    return (
        <main className="bg-zinc-800/30">
            <div className="flex flex-row w-full h-screen">
                <div className="flew flex-col w-1/3">
                    <SupportChatList />
                </div>
                <div className="flew flex-col w-2/3">
                    <ChatMessageContainer />
                    <ChatFloatCardInput adminId="fzt0exjsuzji4ng" />
                </div>
            </div>
        </main>
    );
}
