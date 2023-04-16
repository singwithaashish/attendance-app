import React, { useState } from 'react';
import './App.css';
import Registration from './components/Registration';
import Attendance from './components/Attendance';
import * as faceapi from 'face-api.js';
import { loadModels } from './faceRecognition';
import { dataURLToBlob } from 'blob-util';


function App() {
  const [students, setStudents] = useState([]);

  const onRegister = async (student) => {
    // Load face-api.js models
    await loadModels();
  
    // Detect faces and compute face descriptors
    const input = await faceapi.bufferToImage(dataURLToBlob(student.imageSrc));
    const detection = await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor();
  
    if (detection) {
      student.descriptor = detection.descriptor;
      student.label = students.length.toString(); // Add this line to assign a label
      setStudents([...students, student]);
      console.log(students);
    } else {
      alert('No face detected. Please try again.');
    }
  };
  


  const onMarkAttendance = async (imageSrc) => {
    // Load face-api.js models
    await loadModels();
  
    // Detect faces and compute face descriptors
    const input = await faceapi.bufferToImage(dataURLToBlob(imageSrc));
    const detections = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
  
    // Create labeledFaceDescriptors from registered students
    const labeledFaceDescriptors = students.map(
      (s) => new faceapi.LabeledFaceDescriptors(s.label, [s.descriptor])
    );
    
    // Compare face descriptors with registered students
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
  
    for (const detection of detections) {
      const match = faceMatcher.findBestMatch(detection.descriptor);
      if (match.distance < 0.6) { // You can adjust the threshold
        const studentIndex = parseInt(match.label, 10);
        const student = students[studentIndex];
        student.present = true;
        console.log(student);
      }
    }
  };
  
  


  return (
    <div className="App">
      <h1>Facial Recognition Attendance System</h1>
      <Registration onRegister={onRegister} />
      <Attendance students={students} onMarkAttendance={onMarkAttendance} />
    </div>
  );
}

export default App;
