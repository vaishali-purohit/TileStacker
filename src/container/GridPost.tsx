import React, { useEffect, useState } from 'react';
import MessageInfo from '../component/MessageInfo';
import YearPosts from '../types/Year.type';
import Message from '../types/Message.type';
import sortByDate from '../util/sortByDate';
import MessageForm from '../component/MessageForm';

type GridPostProps = {
  originalData: YearPosts[] | null;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<'reset' | 'sort' | string>>;
};

const GridPost: React.FC<GridPostProps> = ({
  originalData,
  filter,
  setFilter,
}) => {
  const [messageList, setMessageList] = useState<YearPosts[] | null>(null);
  const [draggedItem, setDraggedItem] = useState<{
    yearIndex: number;
    postIndex: number;
  } | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (filter === 'reset') {
      setMessageList(
        originalData ? JSON.parse(JSON.stringify(originalData)) : null
      );
    }

    if (filter === 'sort') {
      if (messageList) {
        const sorted = sortByDate(JSON.parse(JSON.stringify(messageList)));
        if (sorted) {
          setMessageList(sorted);
        }
      }
    }
  }, [filter, originalData]);

  const handleDragStart = (
    e: React.DragEvent,
    yearIndex: number,
    postIndex: number
  ) => {
    setDraggedItem({ yearIndex, postIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    targetYearIndex: number,
    targetPostIndex: number
  ) => {
    e.preventDefault();

    if (draggedItem) {
      const { yearIndex: sourceYearIndex, postIndex: sourcePostIndex } =
        draggedItem;

      if (sourceYearIndex !== targetYearIndex) {
        return; // Don't allow the drop
      }

      const newMessageList = JSON.parse(JSON.stringify(messageList));
      const sourcePost = newMessageList[sourceYearIndex].posts[sourcePostIndex];
      newMessageList[sourceYearIndex].posts.splice(sourcePostIndex, 1);
      newMessageList[targetYearIndex].posts.splice(
        targetPostIndex,
        0,
        sourcePost
      );

      setMessageList(newMessageList);
      setFilter('drag');
      setDraggedItem(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const addMessage = (date: string, message: string) => {
    const year = new Date(date).getFullYear();
    const newPost = { date, message };

    // Update the messageList state based on the previous state
    setMessageList((prevData) => {
      if (!prevData) return [];
      const yearObj = prevData.find((item) => item.year === year);
      let updatedData;

      if (yearObj) {
        updatedData = prevData.map((item) =>
          item.year === year
            ? { ...item, posts: [...item.posts, newPost] }
            : item
        );
      } else {
        updatedData = [
          ...prevData,
          {
            year,
            posts: [newPost],
          },
        ];
      }

      updatedData.sort((a, b) => b.year - a.year);
      return updatedData;
    });
  };

  // If posts are not loaded, return a loading state or null
  if (!messageList || !messageList.length) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        No Data to Show
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          className="float-end px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg transform transition-all duration-300 hover:bg-blue-600 hover:scale-105"
          onClick={() => setShowForm(true)}
        >
          Add New Message
        </button>
      </div>
      {messageList.map(({ year, posts }, yearIndex) => (
        <div className="py-4" key={year}>
          {/* Heading Section */}
          <div className=" mb-8">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-purple-500 to-pink-500 tracking-wide">
              {year}
            </h2>
          </div>

          {/* Main Content Section */}
          <div className="flex flex-wrap gap-8">
            {posts.map((post: Message, postIndex: number) => (
              <MessageInfo
                post={post}
                key={postIndex}
                yearIndex={yearIndex}
                postIndex={postIndex}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        </div>
      ))}
      {showForm && (
        <MessageForm
          open={showForm}
          addTile={addMessage}
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default GridPost;
