import React from 'react';
import Camera from './Camera';

const Attendance = ({ students, onMarkAttendance }) => {
  const onCapture = (imageSrc) => {
    onMarkAttendance(imageSrc);
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <Camera onCapture={onCapture} />
    </div>
  );
};

export default Attendance;
