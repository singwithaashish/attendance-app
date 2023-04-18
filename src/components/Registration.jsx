import React, { useState } from 'react';
import Camera from './Camera';

const Registration = ({ onRegister, loading }) => {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const classnames = {
    'input': 'p-4 m-4 rounded border-2 w-[50vw] '
  }

  const onCapture = (imageSrc) => {
    if(name.length <1 || usn.length < 1)
    {
      alert("please fill name and usn field")
      return
    }
    onRegister({ name, usn, imageSrc });
  };

  return (
    <div>
      <h2 className='font-bold text-green-600'>Student Registration</h2>
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
        className={classnames.input + " uppercase"}
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />
      
        </div>
      <Camera onCapture={onCapture} loading={loading}/>
    </div>
  );
};

export default Registration;
