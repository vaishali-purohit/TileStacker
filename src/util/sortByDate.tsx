import YearPosts from '../types/Year.type';

// Get sorted dates in descending order
const sortByDate = (
  messageList: YearPosts[] | null
): YearPosts[] | undefined => {
  return messageList?.map(({ year, posts }) => ({
    year,
    posts: [...posts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ), // Sort posts by date
  }));
};

export default sortByDate;
