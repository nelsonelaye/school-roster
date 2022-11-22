const school_roster: student_data[] = require("./data.json");
const fs = require("fs");

type student_data = {
  firstname: string;
  lastname: string;
  grade: number;
};

function add_new_student(data: student_data): student_data {
  school_roster.push(data);

  fs.writeFile("./data.json", JSON.stringify(school_roster), (error: any) => {
    if (error) {
      return error;
    }
  });

  return data;
}

function view_by_grade(grade: number): Array<student_data> | string {
  let grade_roster = school_roster.filter((g) => g.grade === grade);

  if (grade_roster.length <= 0) {
    return `No student found in grade ${grade}`;
  }
  return grade_roster;
}

function sort_student(): Array<student_data> {
  let final_sort: Array<student_data> = [];

  let sorted_by_grade = school_roster.sort(function (
    a: student_data,
    b: student_data
  ) {
    return a.grade - b.grade;
  });

  let max_value: number = sorted_by_grade[sorted_by_grade.length - 1].grade;

  // sort by name for all grades after first sorting by grade
  for (let i = 0; i <= max_value; i++) {
    let students_by_grade = sorted_by_grade.filter((x) => x.grade === i);

    let sorted_by_firstname = students_by_grade.sort(
      (a: student_data, b: student_data) => {
        let s = a.firstname.localeCompare(b.firstname);
        return s;
      }
    );

    final_sort.push(...sorted_by_firstname);
  }

  return final_sort;
}

// console.log(
//   add_new_student({
//     firstname: "James",
//     lastname: "Joseph",
//     grade: 3,
//   })
// );

// console.log(view_by_grade(4));

// console.log(sort_student());
