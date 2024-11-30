import React, { useEffect, useState } from 'react';
import Header from './container/Header';
import GridPost from './container/GridPost';
import groupPostsByYear from './util/groupByYear';
import sortedYears from './util/sortedYears';
import { input } from './data/dummyInput';
import YearPosts from './types/Year.type';

const App: React.FC = () => {
  const [originalData, setOriginalData] = useState<YearPosts[] | null>(null);
  const [filter, setFilter] = useState<string>('reset');

  useEffect(() => {
    const groupedPosts = groupPostsByYear(input); // Group posts by year
    const years = sortedYears(groupedPosts); // Get the sorted years in descending order

    setOriginalData(years);
  }, []);

  return (
    <>
      <Header
        onReset={() => setFilter('reset')}
        onSort={() => setFilter('sort')}
      />
      <GridPost originalData={originalData} filter={filter} />
    </>
  );
};

export default App;
