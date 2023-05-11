import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebasething";

async function addStudent(student) {
  try {
    const custStd = {
        name: student.name,
        usn: student.usn,
        imageSrc: student.imageSrc,
        descriptor: Array.from(student.descriptor),
        label: student.label,
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

export { addStudent, getStudents };
