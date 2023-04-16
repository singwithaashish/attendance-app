import React from 'react';

const Dashboard = ({ students }) => {
  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              USN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Present
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img className="h-10 w-10 rounded-full" src={student.imageSrc} alt="" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.usn}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`${
                    student.present ? 'bg-green-100' : 'bg-red-100'
                  } px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.present ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {student.present ? 'Present' : 'Absent'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
