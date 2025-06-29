import React, { useState } from 'react';

const SimpleTest: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Simple React Test</h1>
      <p className="mb-4">This is a simple React component that doesn't rely on Redux or any other dependencies.</p>
      
      <div className="p-4 bg-blue-50 rounded-md mb-4">
        <p className="font-semibold">Counter: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Increment
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>✅ If you can see this component and the counter works, React is functioning correctly!</p>
      </div>
    </div>
  );
};

export default SimpleTest;