import React from 'react';
import Message from '../types/Message.type';

type MessageInfoProps = {
  post: Message;
};

const MessageInfo: React.FC<MessageInfoProps> = ({ post }) => {
  return (
    <div
      key={post?.message}
      className="flex-1 min-w-[300px] max-w-[350px] bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="border-b border-gray-500 pb-4 mb-4 text-sm font-semibold text-gray-800">
        <strong>Date:</strong> {post?.date}
      </div>
      <div className="text-sm text-gray-700">
        <p> {post?.message}</p>
      </div>
    </div>
  );
};

export default MessageInfo;
