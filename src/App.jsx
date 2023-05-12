import React, { useEffect, useState } from "react";
import "./App.css";
import Registration from "./components/Registration";
import Attendance from "./components/Attendance";
import * as faceapi from "face-api.js";
import { loadModels } from "./faceRecognition";
import { dataURLToBlob } from "blob-util";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebasething";
import { addStudent, markattendance } from "./fireFunc";
// import { Route, Router, Routes } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar } from "flowbite-react";
import CustNavBar from "./components/CustNavBar";
import Statistics from "./components/Statistics";

function App() {
  // students are fetched in realtime from firebase
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const unsubscribeLibraries = onSnapshot(collection(db, "students"), (snapshot) => {
      const allStudents = [];
      snapshot.forEach((doc) => {
        allStudents.push({ 
          // ...doc.data(), label: doc.id 
          name: doc.data().name,
          usn: doc.data().usn,
          imageSrc: doc.data().imageSrc,
          label: doc.data().label,
          descriptor: new Float32Array(doc.data().descriptor),
          attendance: doc.data().attendance,
          id: doc.id
        });
      });
      console.log(allStudents);
      setStudents(allStudents);
    });
  
    return () => unsubscribeLibraries();
  }, []);
  

  const onRegister = async (student) => {
    setLoading(true)
    // Load face-api.js models
    await loadModels();

    // Detect faces and compute face descriptors
    const input = await faceapi.bufferToImage(dataURLToBlob(student.imageSrc));
    const detection = await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceDescriptor();

    // also check if the face doesnt already exist in the database
    if (
      detection &&
      !students.some((s) => s.descriptor === detection.descriptor)
    ) {
      student.descriptor = detection.descriptor;
      student.label = students.length.toString(); // Add this line to assign a label
      // ! replace this with firebase
      console.log(student);
      // setStudents([...students, student]);
      addStudent(student);
      // console.log(students);
    } else {
      alert("No face detected OR face already registered. Please try again.");
    }
    setLoading(false);
  };


  const onMarkAttendance = async (imageSrc) => {
    setLoading(true)
    // Load face-api.js models
    await loadModels();

    // Detect faces and compute face descriptors
    const input = await faceapi.bufferToImage(dataURLToBlob(imageSrc));
    const detections = await faceapi
      .detectAllFaces(input)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // Create labeledFaceDescriptors from registered students
    const labeledFaceDescriptors = students.map(
      (s) => new faceapi.LabeledFaceDescriptors(s.label, [s.descriptor])
    );

    // Compare face descriptors with registered students
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

    // console.log(detections, faceMatcher, labeledFaceDescriptors);

    for (const detection of detections) {
      const match = faceMatcher.findBestMatch(detection.descriptor);
      console.log(match);
      if (match.distance < 0.6) {
        // You can adjust the threshold
        const studentIndex = parseInt(match.label, 10);
        console.log(studentIndex);
        // const student = students[studentIndex];
        const student = students.find((s) => s.label === match.label);
        // student.present = true;
        // // update the student in the students array
        // students[studentIndex] = student;
        // setStudents([...students]);
        await markattendance(match.label);
        setLoading(false)
        console.log(student);
      }
    }
    setLoading(false);
  };

  const allPages = [
    <Login setPage={setPage}/>,
    <Dashboard studentList={students} setPage={setPage}/>,
    <Registration onRegister={onRegister} loading={loading} />,
    <Attendance students={students} onMarkAttendance={onMarkAttendance} loading={loading} />,
  ];

  const pageName = [
    "Login Page",
    "Dashboard",
    "Registration Page",
    "Attendance Page"
  ]

  

  return (
    // <div className="p-10 pt-0 flex flex-col items-center bg-gray-200">
    //   <div className="w-screen py-5 mb-5 bg-gray-300 text-center font-bold uppercase rounded">Facial Recognition Attendance System
    //   <h1 className="text-green-600 font-bold text-xl">
    //     {pageName[page]}
    //   </h1>

    //   {page > 1 && <button
    //       onClick={() => {
    //         setPage(1);
    //       }}
    //       className=" bg-green-600 text-white font-bold m-4 p-4 rounded"
    //     >
    //       GO TO Dashboard
    //     </button>}
      
    //   </div>
      

    //   {page!== 0 && <div className="flex overflow-scroll">
    //     {students.map((student) => {
    //       return <StudCardAgain student={student} />;
    //     })}
    //   </div>}
    //   {allPages[page]}

    //   {page > 1 && (page == 2 ? (
    //     <button
    //       onClick={() => {
    //         setPage(3);
    //       }}
    //       className=" bg-red-600 text-white font-bold m-4 p-4 rounded"
    //     >
    //       GO TO ATTENDANCE
    //     </button>
    //   ) : (
    //     <button
    //       onClick={() => {
    //         setPage(2);
    //       }}
    //       className=" bg-red-600 text-white font-bold m-4 p-4 rounded"
    //     >
    //       GO TO REGISTRATION
    //     </button>
    //   ))}

    // </div>
      <Router>
        <CustNavBar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Registration onRegister={onRegister} loading={loading}/>}/>
          <Route path="/attendance" element={<Attendance onMarkAttendance={onMarkAttendance} loading={loading}/>}/>
          <Route path="/dashboard" element={<Dashboard studentList={students} setPage={setPage}/>} />
          <Route path="/login" element={<Login setPage={setPage}/>}/>
          <Route path="/details/:id" element={<Statistics/>}/>

        </Routes>
      </Router>
  );
}


const StudCardAgain = ({ student }) => {
  return (
    <div className="flex flex-col items-center rounded p-2 mr-2 bg-white">
      <img
        className="rounded object-cover max-w-full w-40 h-40"
        src={student.imageSrc}
        alt=""
        srcset=""
      />
      <h2 className="font-bold">{student.name}</h2>
      <h2 className="font-thin uppercase ">{student.usn}</h2>

      {student.present ? (
        <div className="p-2 m-2 w-full text-center bg-green-500 opacity-80 rounded text-white">
          Present
        </div>
      ) : (
        <div className="p-2 m-2 w-full text-center bg-red-500 opacity-80 rounded text-white">
          Absent
        </div>
      )}
    </div>
  );
};
export default App;
