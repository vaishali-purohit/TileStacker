import Message from '../types/Message.type';

type YearPosts = {
  year: number;
  posts: Message[];
};

// Get sorted years in descending order
const sortedYears = (groupedPosts: Map<number, Message[]>): YearPosts[] => {
  return [...groupedPosts.entries()]
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, posts]) => ({ year, posts }));
};

export default sortedYears;
