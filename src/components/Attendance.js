import React from 'react';
import Camera from './Camera';

const Attendance = ({ onCapture }) => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
      <Camera onCapture={onCapture} />
    </div>
  );
};

export default Attendance;
