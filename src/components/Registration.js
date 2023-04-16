import React, { useState } from 'react';
import Camera from './Camera';

const Registration = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');

  const onCapture = (imageSrc) => {
    onRegister({ name, usn, imageSrc });
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />
      <Camera onCapture={onCapture} />
    </div>
  );
};

export default Registration;
