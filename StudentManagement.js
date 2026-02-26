// Variables
const students = [
  { name: "Aisha", marks: 85 },
  { name: "Rahul", marks: 60 },
  { name: "Zoya", marks: 95 },
  { name: "Arjun", marks: 40 }
];

// Normal Function
function displayStudents(data) {
  console.log(data);
}

displayStudents(students);

// Arrow Function + map
const studentNames = students.map(student => student.name);
console.log("Names:", studentNames);

// Filter passed students
const passedStudents = students.filter(
  student => student.marks >= 50
);
console.log("Passed:", passedStudents);

// Reduce → total marks
const totalMarks = students.reduce(
  (total, student) => total + student.marks,
  0
);

console.log("Total Marks:", totalMarks);