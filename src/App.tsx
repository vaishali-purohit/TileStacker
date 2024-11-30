import React from 'react';
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <div className="text-center">
        <h1 className="text-4xl text-blue-500">Vite + React + TS</h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
