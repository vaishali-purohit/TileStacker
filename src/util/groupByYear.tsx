import Message from '../types/Message.type';

// Group posts by year
const groupPostsByYear = (posts: Message[]): Map<number, Message[]> => {
  const grouped = new Map<number, Message[]>();

  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)?.push(post);
  }

  return grouped;
};

export default groupPostsByYear;
