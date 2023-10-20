import PocketBase from 'pocketbase';
import { ISupportChat } from '@/interfaces/IUser';
import { CustomButton } from './CustomButton';

export const revalidate = 20;

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

export default async function SupportChatList() {
    const supportChats = await getSupportChats();

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
