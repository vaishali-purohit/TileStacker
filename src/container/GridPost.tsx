import React, { useEffect, useState } from 'react';
import MessageInfo from '../component/MessageInfo';
import YearPosts from '../types/Year.type';
import Message from '../types/Message.type';
import sortByDate from '../util/sortByDate';

type GridPostProps = {
  originalData: YearPosts[] | null;
  filter: string;
};

const GridPost: React.FC<GridPostProps> = ({ originalData, filter }) => {
  const [messageList, setMessageList] = useState<YearPosts[] | null>(null);

  useEffect(() => {
    if (filter === 'reset') {
      setMessageList(originalData);
    }

    if (filter === 'sort') {
      const sorted = sortByDate(messageList);
      if (sorted) {
        setMessageList(sorted);
      }
    }
  }, [filter, originalData]);

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
      {messageList.map(({ year, posts }) => (
        <div className="py-4" key={year}>
          {/* Heading Section */}
          <div className=" mb-8">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-purple-500 to-pink-500 tracking-wide">
              {year}
            </h2>
          </div>

          {/* Main Content Section */}
          <div className="flex flex-wrap gap-8">
            {posts.map((post: Message, index: number) => (
              <MessageInfo post={post} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridPost;
