import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [usn, setUsn] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the login logic here, such as checking if the USN exists in the list of registered students.
    // If the login is successful, navigate to the attendance page.
    navigate('/attendance');
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit}>
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
        <div className="mt-4">
          Don't have an account?{' '}
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
