import React from 'react';
import { Link } from 'react-router-dom';

const data = [
  {
    id: 1,
    usn: 'CS101',
    name: 'Alice',
    image: 'https://via.placeholder.com/50',
    present: true,
  },
  {
    id: 2,
    usn: 'CS102',
    name: 'Bob',
    image: 'https://via.placeholder.com/50',
    present: false,
  },
  // Add more data as required
];

const Dashboard = ({studentList, setPage}) => {
  return (
    <div className="container mx-auto px-4">
        <div className="flex">

         <button
          onClick={() => {
            setPage(3);
          }}
          className=" bg-red-600 text-white font-bold m-4 p-4 rounded"
        >
          GO TO ATTENDANCE
        </button>
      
        <button
          onClick={() => {
            setPage(2);
        }}
        className=" bg-red-600 text-white font-bold m-4 p-4 rounded"
        >
          GO TO REGISTRATION
        </button>
            </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300 text-gray-800">
            <th className="py-4 px-6">Id</th>
            <th className="py-4 px-6">USN</th>
            <th className="py-4 px-6">Name</th>
            <th className="py-4 px-6">Image</th>
            <th className="py-4 px-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-100" >
              <td className="py-4 px-6">{index+1}</td>
              <td className="py-4 px-6">{row.usn}</td>
              <Link to={`/details/${row.id}`}>
              <td className="py-4 px-6">{row.name}</td>
                </Link>
              <td className="py-4 px-6">
                <img src={row.imageSrc} alt={row.name} className="w-10 h-10 rounded-full" />
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block py-1 px-3 text-white font-semibold ${
                    isStudentPresnetToday(row) ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {isStudentPresnetToday(row) ? 'Present' : 'Absent'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// sample student.attendance = ['16-09-2021', '17-09-2021']

function isStudentPresnetToday(student) {
console.log(student);
  const today = new Date();
  const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dateStr = date + "-" + month + "-" + year;
  if(student.attendance.includes(dateStr)) {
    return true;
  }else {
    return false;
  }
}

export default Dashboard;
