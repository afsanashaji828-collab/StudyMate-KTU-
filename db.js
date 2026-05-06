const subjects = [
  // Semester 1
  { code: "MAT101", name: "Linear Algebra and Calculus", semester: 1, credits: 4, modules: 5 },
  { code: "PHT100", name: "Engineering Physics A", semester: 1, credits: 4, modules: 5 },
  { code: "CYT100", name: "Engineering Chemistry", semester: 1, credits: 4, modules: 5 },
  { code: "EST100", name: "Engineering Mechanics", semester: 1, credits: 3, modules: 5 },
  { code: "EST110", name: "Engineering Graphics", semester: 1, credits: 3, modules: 5 },
  { code: "EST120", name: "Basics of Civil & Mechanical Eng", semester: 1, credits: 4, modules: 5 },
  { code: "EST130", name: "Basics of Electrical & Electronics Eng", semester: 1, credits: 4, modules: 5 },
  { code: "HUN101", name: "Life Skills", semester: 1, credits: 2, modules: 5 },
  // Semester 2
  { code: "MAT102", name: "Vector Calculus, Differential Eq", semester: 2, credits: 4, modules: 5 },
  { code: "HUT102", name: "Professional Communication", semester: 2, credits: 2, modules: 5 },
  { code: "EST102", name: "Programming in C", semester: 2, credits: 4, modules: 5 },
  // Semester 3
  { code: "MAT203", name: "Discrete Mathematical Structures", semester: 3, credits: 4, modules: 5 },
  { code: "CST201", name: "Data Structures", semester: 3, credits: 4, modules: 5 },
  { code: "CST203", name: "Logic System Design", semester: 3, credits: 4, modules: 5 },
  { code: "CST205", name: "Object Oriented Programming Using Java", semester: 3, credits: 4, modules: 5 },
  { code: "EST200", name: "Design & Engineering", semester: 3, credits: 2, modules: 5 },
  { code: "HUT200", name: "Professional Ethics", semester: 3, credits: 2, modules: 5 },
  { code: "MCN201", name: "Sustainable Engineering", semester: 3, credits: 0, modules: 5 },
  // Semester 4
  { code: "MAT266", name: "Mathematical Foundations for Security Systems", semester: 4, credits: 4, modules: 5 },
  { code: "CST202", name: "Computer Organisation and Architecture", semester: 4, credits: 4, modules: 5 },
  { code: "CST204", name: "Database Management Systems", semester: 4, credits: 4, modules: 5 },
  { code: "CST206", name: "Operating Systems", semester: 4, credits: 4, modules: 5 },
  { code: "MCN202", name: "Constitution of India", semester: 4, credits: 0, modules: 5 },
  { code: "CCL202", name: "Scripting Languages for Security", semester: 4, credits: 2, modules: 5 },
  // Semester 5
  { code: "CST301", name: "Formal Languages and Automata Theory", semester: 5, credits: 4, modules: 5 },
  { code: "CST303", name: "Computer Networks", semester: 5, credits: 4, modules: 5 },
  { code: "CST305", name: "System Software", semester: 5, credits: 4, modules: 5 },
  { code: "CST307", name: "Microprocessors and Microcontrollers", semester: 5, credits: 4, modules: 5 },
  { code: "CST309", name: "Management of Software Systems", semester: 5, credits: 3, modules: 5 },
  { code: "MCN301", name: "Disaster Management", semester: 5, credits: 0, modules: 5 },
  { code: "AIT305", name: "Machine Learning (AI/ML)", semester: 5, credits: 4, modules: 5 },
  // Semester 6
  { code: "CST302", name: "Compiler Design", semester: 6, credits: 4, modules: 5 },
  { code: "CCT304", name: "Cyber Forensics", semester: 6, credits: 4, modules: 5 },
  { code: "CST306", name: "Algorithm Analysis and Design", semester: 6, credits: 4, modules: 5 },
  { code: "HUT300", name: "Industrial Economics & Foreign Trade", semester: 6, credits: 3, modules: 5 },
  { code: "AIT302", name: "Deep Learning (AI/ML)", semester: 6, credits: 4, modules: 5 },
  // Semester 7
  { code: "CST401", name: "Artificial Intelligence", semester: 7, credits: 4, modules: 5 },
  { code: "CCT403", name: "Network Security Protocols", semester: 7, credits: 4, modules: 5 },
  { code: "MCN401", name: "Industrial Safety Engineering", semester: 7, credits: 0, modules: 5 },
  // Semester 8
  { code: "CST402", name: "Distributed Computing", semester: 8, credits: 4, modules: 5 },
  { code: "CCT404", name: "Cryptography and Security", semester: 8, credits: 4, modules: 5 },
  { code: "AIT404", name: "Natural Language Processing (AI/ML)", semester: 8, credits: 4, modules: 5 }
];

subjects.forEach(sub => {
  sub.modules = [];
  for (let i = 1; i <= sub.modules_count || i <= 5; i++) {
    sub.modules.push({
      moduleNo: i,
      title: `${sub.name} - Module ${i}`,
      topics: [
        `Introduction to ${sub.name} Concepts`,
        `Core Algorithms and Operations`,
        `Performance and Analysis`,
        `Advanced Applications`
      ]
    });
  }
});

module.exports = subjects;
