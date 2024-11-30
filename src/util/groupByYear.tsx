import Message from '../types/Message.type';

// Group posts by year
const groupPostsByYear = (posts: Message[]): { [key: number]: Message[] } => {
  const grouped: { [key: number]: Message[] } = {};

  for (const post of posts) {
    const year = new Date(post.date).getFullYear(); // Extract the year from the date
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(post);
  }

  return grouped;
};

export default groupPostsByYear;
