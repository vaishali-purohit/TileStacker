import React from 'react';
import Message from '../types/Message.type';

type MessageInfoProps = {
  post: Message;
  yearIndex: number;
  postIndex: number;
  onDragStart: (
    e: React.DragEvent,
    yearIndex: number,
    postIndex: number
  ) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, yearIndex: number, postIndex: number) => void;
  onDragEnd: () => void;
};

const MessageInfo: React.FC<MessageInfoProps> = ({
  post,
  yearIndex,
  postIndex,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  return (
    <div
      key={post?.message}
      className="flex-1 min-w-[300px] max-w-[350px] bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
      draggable
      onDragStart={(e) => onDragStart(e, yearIndex, postIndex)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, yearIndex, postIndex)}
      onDragEnd={onDragEnd}
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
