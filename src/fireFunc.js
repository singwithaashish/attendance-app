import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebasething";

async function addStudent(student) {
  try {
    const custStd = {
      name: student.name,
      usn: student.usn,
      imageSrc: student.imageSrc,
      descriptor: Array.from(student.descriptor),
      label: student.label,
      attendance: [],
  }
  const libRef = await addDoc(collection(db, "students"), custStd);
  return libRef;
} catch (error) {
  console.log("Error adding library:", error);
  return null;
}
}

async function getStudents() {
  const studentsCol = collection(db, "students");
  const studentSnapshot = await getDocs(studentsCol);
  const studentList = studentSnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id })
  );
  return studentList;
}

async function deleteStudent(id) {
  try {
    const studentRef = doc(db, 'students', id);
    await deleteDoc(studentRef);
    console.log('Student deleted successfully');
  } catch(e) {
    console.error('Error deleting student: ', e);
  }
}
 

async function getStudentById(id) {
  const studentRef = doc(db, "students", id);
  const studentSnapshot = await getDoc(studentRef);
  const student = { 
    name: studentSnapshot.data().name,
    usn: studentSnapshot.data().usn,
    imageSrc: studentSnapshot.data().imageSrc,
    label: studentSnapshot.data().label,
    attendance: studentSnapshot.data().attendance,
    descriptor: new Float32Array(studentSnapshot.data().descriptor),
    id: studentSnapshot.id
   };
  return student;
}

async function markattendance(studentLabel){
  try{
    // update attencance field in students collection for each students
    // add the dates they are present in the array
    // if the date is already present, do not add it

    // get the student with the label
    const studentsCol = collection(db, "students");
    const studentSnapshot = await getDocs(studentsCol);
    const studentList = studentSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );

    // get the student with the label
    const student = studentList.filter((student) => student.label === studentLabel)[0];
    console.log(student);

    // get the current date
    const today = new Date();

    // check if the date is already present in the array
    const attendance = student.attendance;
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dateStr = date + "-" + month + "-" + year;

    if(attendance.includes(dateStr)){
      alert("Attendance already marked for today");
      return;
    }

    // if not present, add it to the array
    attendance.push(dateStr);

    // update the attendance field in the database
    const studentRef = doc(db, "students", student.id);
    await updateDoc(studentRef, {
      attendance: attendance,
    });

   

} catch (error) {
  console.log("Error adding library:", error);
  return null;
}
}

export { addStudent, getStudents, markattendance, getStudentById, deleteStudent };
