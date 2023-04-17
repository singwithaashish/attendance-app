import React, { useState } from 'react';
import Camera from './Camera';

const Registration = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const classnames = {
    'input': 'p-4 m-4 rounded border-2 w-[50vw] '
  }

  const onCapture = (imageSrc) => {
    onRegister({ name, usn, imageSrc });
  };

  return (
    <div>
      <h2 className='font-thin text-red-600'>Student Registration</h2>
      <div className="flex flex-col">

      <input
        type="text"
        placeholder="Name"
        className={classnames.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="USN"
        className={classnames.input}
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />
      
        </div>
      <Camera onCapture={onCapture} />
    </div>
  );
};

export default Registration;
