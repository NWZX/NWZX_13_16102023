'use client';

import PocketBase from 'pocketbase';
import { ESupportChatMessageStatus, ISupportChat } from '@/interfaces/IUser';
import { CustomButton } from './CustomButton';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://127.0.0.1:8090');

async function getSupportChats() {
    const result = await pb
        .collection<ISupportChat>('support_chat')
        .getList(1, 10, {
            filter: `status="new"||status="open"`,
            sort: '-created'
        });
    return result.items;
}
async function subscribeSupportChats(callback: Function) {
    pb.collection<ISupportChat>('support_chat').subscribe('*', (e) => {
        if (e.action == 'delete' || e.action == 'update') return;
        callback(e.record);
    });
}
async function unsubscribeSupportChats() {
    pb.collection<ISupportChat>('support_chat').unsubscribe('*');
}

export default function SupportChatList() {
    const [supportChats, setSupportChats] = useState<ISupportChat[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const result = await getSupportChats();
                setSupportChats(result);
            } catch (e) {}
        })();
    }, []);
    useEffect(() => {
        (async () => {
            subscribeSupportChats(
                (e: ISupportChat) =>
                    e.status == ESupportChatMessageStatus.NEW &&
                    setSupportChats([...supportChats, e])
            );
        })();
        return () => {
            unsubscribeSupportChats();
        };
    }, [supportChats]);

    return (
        <div className="flex flex-col">
            {supportChats.map((e) => (
                <div key={e.id} className="flex">
                    <CustomButton supportChat={e} />
                </div>
            ))}
        </div>
    );
}
