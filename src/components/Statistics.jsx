import React, { PureComponent } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getStudentById } from "../fireFunc";
// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// convert attendance dates ['06-10-2021', '07-10-2021'] to something like above
const convertAttendance = (attendance) => {
  const data = [];
  attendance.forEach((date) => {
    data.push({
      name: date,
      uv: date.length,
      pv: 0,
      amt: 0,
    });
  });
  return data;
};

const Statistics = () => {

  const { studentId } = useParams();
  const [student, setStudent] = React.useState({});
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // console.log("Selected library:", libraryId);
    const getLib = async () => {
      const lib = await getStudentById(studentId);
      console.log(lib);
      setStudent(lib);
      setData(convertAttendance(lib.attendance));
    };
    getLib();
  }, [studentId]);
  return (
    <div className=" w-16 h-16">
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Statistics;
