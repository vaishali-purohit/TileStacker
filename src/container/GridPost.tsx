import React, { useEffect, useState, useMemo, useCallback } from 'react';
import MessageInfo from '../component/MessageInfo';
import YearPosts from '../types/Year.type';
import Message from '../types/Message.type';
import sortByDate from '../util/sortByDate';
import MessageForm from '../component/MessageForm';
import Pagination from '../component/Pagination';

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

  // Pagination state for years
  const [currentYearPage, setCurrentYearPage] = useState(1);
  const yearsPerPage = 3;

  useEffect(() => {
    if (filter === 'reset') {
      setMessageList(originalData ? [...originalData] : null);
    } else if (filter === 'sort' && messageList) {
      const sorted = sortByDate([...messageList]);
      setMessageList(sorted);
    }
  }, [filter, originalData]);

  const currentYears = useMemo(() => {
    if (!messageList) return [];
    const startIndex = (currentYearPage - 1) * yearsPerPage;
    return messageList.slice(startIndex, startIndex + yearsPerPage);
  }, [messageList, currentYearPage]);

  // Handle drag and drop logic
  const handleDragStart = useCallback(
    (e: React.DragEvent, yearIndex: number, postIndex: number) => {
      setDraggedItem({ yearIndex, postIndex });
      e.dataTransfer.effectAllowed = 'move';
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetYearIndex: number, targetPostIndex: number) => {
      e.preventDefault();
      if (draggedItem) {
        const { yearIndex: sourceYearIndex, postIndex: sourcePostIndex } =
          draggedItem;
        if (sourceYearIndex !== targetYearIndex) return;

        const newMessageList = [...messageList!];
        const sourcePost =
          newMessageList[sourceYearIndex].posts[sourcePostIndex];
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
    },
    [draggedItem, messageList, setFilter]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const addMessage = (date: string, message: string) => {
    const year = new Date(date).getFullYear();
    const newPost = { date, message };

    // Optimized update to avoid deep cloning
    setMessageList((prevData) => {
      if (!prevData) return [{ year, posts: [newPost] }];

      const yearObj = prevData.find((item) => item.year === year);
      const updatedData = yearObj
        ? prevData.map((item) =>
            item.year === year
              ? { ...item, posts: [...item.posts, newPost] }
              : item
          )
        : [...prevData, { year, posts: [newPost] }];

      // Sort data by year for consistency
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
      <div className="mb-6 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg transform transition-all duration-300 hover:bg-blue-600 hover:scale-105"
          onClick={() => setShowForm(true)}
        >
          Add New Message
        </button>
      </div>

      <div className="py-4">
        {/* Show paginated years */}
        {currentYears.map(({ year, posts }, yearIndex) => (
          <div key={year} className="py-4">
            {/* Heading Section */}
            <div className="mb-8">
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
      </div>

      {/* Pagination Controls */}
      <Pagination
        totalItems={messageList.length}
        itemsPerPage={yearsPerPage}
        currentPage={currentYearPage}
        onPageChange={setCurrentYearPage}
      />

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
