import React, { useState } from "react";
import "./App.css";
import Registration from "./components/Registration";
import Attendance from "./components/Attendance";
import * as faceapi from "face-api.js";
import { loadModels } from "./faceRecognition";
import { dataURLToBlob } from "blob-util";

function App() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);

  const onRegister = async (student) => {
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
      setStudents([...students, student]);
      console.log(students);
    } else {
      alert("No face detected OR face already registered. Please try again.");
    }
  };

  // const isFaceAlreadyRegistered = (newDescriptor, students) => {
  //   const threshold = 0.9; // You can adjust the threshold value for similarity

  //   return students.some((student) => {
  //     const distance = faceapi.euclideanDistance(newDescriptor, student.descriptor);
  //     return distance < threshold;
  //   });
  // };

  // const onRegister = async (student) => {
  //   // Load face-api.js models
  //   await loadModels();

  //   // Detect faces and compute face descriptors
  //   const input = await faceapi.bufferToImage(dataURLToBlob(student.imageSrc));
  //   const detection = await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor();

  //   if (detection) {
  //     if (isFaceAlreadyRegistered(detection.descriptor, students)) {
  //       alert('The face is already registered. Please try a different face.');
  //       console.log(students);
  //     } else {
  //       student.descriptor = detection.descriptor;
  //       student.label = students.length.toString(); // Add this line to assign a label
  //       setStudents([...students, student]);
  //       console.log(students);
  //     }
  //   } else {
  //     alert('No face detected. Please try again.');
  //   }
  // };

  const onMarkAttendance = async (imageSrc) => {
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

    for (const detection of detections) {
      const match = faceMatcher.findBestMatch(detection.descriptor);
      if (match.distance < 0.6) {
        // You can adjust the threshold
        const studentIndex = parseInt(match.label, 10);
        const student = students[studentIndex];
        student.present = true;
        // update the student in the students array
        students[studentIndex] = student;
        setStudents([...students]);

        console.log(student);
      }
    }
  };

  const allPages = [
    <Registration onRegister={onRegister} />,
    <Attendance students={students} onMarkAttendance={onMarkAttendance} />,
  ];

  return (
    <div className="m-10 flex flex-col items-center">
      <h1 className="text-green-600 font-bold text-xl">
        Facial Recognition Attendance System
      </h1>

      <div className="flex overflow-scroll">
        {students.map((student) => {
          return <StudCard student={student} />;
        })}
      </div>
      {allPages[page]}

      {page == 0 ? (
        <button
          onClick={() => {
            setPage(1);
          }}
          className=" bg-red-600 text-white font-bold m-4 p-4 rounded"
        >
          GO TO ATTENDANCE
        </button>
      ) : (
        <button
          onClick={() => {
            setPage(0);
          }}
          className=" bg-red-600 text-white font-bold m-4 p-4 rounded"
        >
          GO TO REGISTRATION
        </button>
      )}
    </div>
  );
}

const StudCard = ({ student }) => {
  return (
    <div className="flex rounded border-green-600 border p-4 shadow-lg mr-4">
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="font-bold mr-2">Name: </h2>
          <p>{student.name}</p>
        </div>
        <div className="flex">
          <h2 className="font-bold mr-2">USN: </h2>
          <p className=" uppercase">{student.usn}</p>
        </div>
        {student.present ? (
          <div className="p-2 m-2 bg-green-500 opacity-80 rounded text-white">
            Present
          </div>
        ) : (
          <div className="p-2 m-2 bg-red-500 opacity-80 rounded text-white">
            Absent
          </div>
        )}
      </div>

      <img
        className="rounded object-cover max-w-full w-40 h-40 ml-4"
        src={student.imageSrc}
        alt=""
        srcset=""
      />
    </div>
  );
};

export default App;
