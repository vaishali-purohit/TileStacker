import React, { useEffect, useState } from 'react';
import groupPostsByYear from './util/groupByYear';
import sortedYears from './util/sortedYears';
import { input } from './data/dummyInput';
import YearPosts from './types/Year.type';

const Header = React.lazy(() => import('./container/Header'));
const GridPost = React.lazy(() => import('./container/GridPost'));

const App: React.FC = () => {
  const [originalData, setOriginalData] = useState<YearPosts[] | null>(null);
  const [filter, setFilter] = useState<string>('reset');

  useEffect(() => {
    const groupedPosts = groupPostsByYear(input);
    const years = sortedYears(groupedPosts);

    setOriginalData(years);
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Header
        onReset={() => setFilter('reset')}
        onSort={() => setFilter('sort')}
      />
      <GridPost
        originalData={originalData}
        filter={filter}
        setFilter={setFilter}
      />
    </React.Suspense>
  );
};

export default App;
