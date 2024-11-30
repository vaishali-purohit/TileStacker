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
    const groupedPosts = groupPostsByYear(input);
    const years = sortedYears(groupedPosts);

    setOriginalData(years);
  }, []);

  return (
    <>
      <Header
        onReset={() => setFilter('reset')}
        onSort={() => setFilter('sort')}
      />
      <GridPost
        originalData={originalData}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
};

export default App;
