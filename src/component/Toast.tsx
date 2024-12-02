import React from 'react';

type ToastProps = {
  message: string;
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed bottom-5 right-5 max-w-xs p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center space-x-4">
      <span>{message}</span>
    </div>
  );
};

export default Toast;
