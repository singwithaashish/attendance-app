import React from 'react';
import Camera from './Camera';

const Attendance = ({ students, onMarkAttendance, loading }) => {
  const onCapture = (imageSrc) => {
    onMarkAttendance(imageSrc);
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <Camera onCapture={onCapture} loading={loading} />
    </div>
  );
};

export default Attendance;
