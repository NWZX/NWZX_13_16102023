'use client';

interface ChatMessageProps {
    message: string;
    isReceived: boolean;
}

export default function ChatMessage({ message, isReceived }: ChatMessageProps) {
  return (
    <div className={`flex ${isReceived ? 'flex-row-reverse' : 'flex-row'} items-center gap-2`}>
      <div className="flex flex-col">
        <div className={`rounded-xl p-4 ${isReceived ? 'bg-green-500' : 'bg-blue-500 text-white'}`}>
          {message}
        </div>
      </div>
    </div>
  );
}