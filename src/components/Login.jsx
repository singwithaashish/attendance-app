// a simple login page using tailwind that takes username and password

import React from 'react'

function Login({setPage}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const un = document.getElementById("username").value
        const pw = document.getElementById("password").value
        // console.log(un + " --------- " + pw)
        if(un === "admin" && pw === "thispw"){

            setPage(1);
        }else{
            alert("The username or password is incorrect")
        }

    }
  return (
    <div className="w-screen flex items-center justify-center">
      <div className="bg-white w-full md:w-3/5 lg:w-2/5 xl:w-1/3 px-6 py-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              required
              id="username"
              className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login