import React, { useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { getStudentById } from '../fireFunc';
import { useParams } from 'react-router-dom';

// let's assume that attendance dates are in 'YYYY-MM-DD' format
// const attendance = ['2023-06-15', '2023-06-16'];

// const transformData = (attendance) => {
//   const attendanceCount = attendance.reduce((acc, date) => {
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});
//   return Object.keys(attendanceCount).map((date) => ({
//     date,
//     count: attendanceCount[date],
//   }));
// };

const transformData = (attendance) => {
  const attendanceCount = attendance.reduce((acc, date) => {
    // convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
    const [day, month, year] = date.split('-');
    const formattedDate = `${year}-${month}-${day}`;
    acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(attendanceCount).map((date) => ({
    date,
    count: attendanceCount[date],
  }));
};

const Statistics = () => {
  const [data, setData] = React.useState([]);

  const { id } = useParams();
  
  useEffect(() => {
    const getdata = async () => {
      const dat = await getStudentById(id);
      console.log(dat);
      console.log(transformData(dat.attendance));
      setData(transformData(dat.attendance));
    };
    getdata();
  }, [id]);

  // React.useEffect(() => {
  //   setData(transformData(attendance));
  // }, []);

  return (
    <div className="w-screen h-screen">
      <CalendarHeatmap
        startDate={new Date('2023-01-01')}
        endDate={new Date('2023-12-31')}
        values={data}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          // attribute 'data-tip' is important to show the tooltip for a cell
          return {
            'data-tip': `${value.date} has count: ${value.count}`,
          };
        }}
      />
      {/* < /> */}
    </div>
  );
};

export default Statistics;
