import React from 'react';
import TestMap from '../components/TestMap';

const MapTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Map Test Page</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <TestMap />
        </div>
      </div>
    </div>
  );
};

export default MapTest;