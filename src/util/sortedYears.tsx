import Message from '../types/Message.type';

type YearPosts = {
  year: number;
  posts: Message[];
};

// Get sorted years in descending order
const sortedYears = (groupedPosts: {
  [key: number]: Message[];
}): YearPosts[] => {
  const sortedEntries = Object.entries(groupedPosts).sort(
    ([yearA], [yearB]) => Number(yearB) - Number(yearA)
  );

  return sortedEntries.map(([year, posts]) => ({
    year: Number(year),
    posts,
  }));
};

export default sortedYears;
