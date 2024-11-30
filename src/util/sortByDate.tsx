import YearPosts from '../types/Year.type';

// Sort posts by date in ascending order and years in chronological order (latest year first)
const sortByDate = (
  messageList: YearPosts[] | null
): YearPosts[] | undefined => {
  if (!messageList) return;

  const sortedMessageList = messageList.map(({ year, posts }) => ({
    year,
    posts: [...posts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  }));

  return sortedMessageList;
};

export default sortByDate;
