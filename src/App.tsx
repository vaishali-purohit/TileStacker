import React from 'react';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <h1 className="text-4xl text-blue-500">Vite + React + TS</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </React.Fragment>
  );
};

export default App;
