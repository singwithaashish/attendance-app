import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Camera from './Camera';

const Register = () => {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const navigate = useNavigate();

  const onRegister = (imageData) => {
    // Perform the registration logic here, such as saving the student data and the captured image.
    // After the registration is successful, navigate back to the login page.
    console.log('Name:', name);
    console.log('USN:', usn);
    console.log('Image Data:', imageData);
    navigate('/');
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usn">
          USN
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="usn"
          type="text"
          placeholder="Enter your USN"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
        />
      </div>
      <Camera onCapture={onRegister} />
      <Link className="text-blue-500 hover:text-blue-700 mt-4 block" to="/">
        Back to Login
      </Link>
    </div>
  );
};

export default Register;
