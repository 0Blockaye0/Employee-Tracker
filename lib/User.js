const db = require("../db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");
const init = require("../userPrompt");
const { getDeptID } = require("./Dept");
// const init = require("../userPrompt");
// import {init} from '../userPrompt';

class User {
  constructor() {
    //    DO I NEED ANYTHING HERE?
  }
  // DONE
  viewAllDept() {
    //   console.log("inside viewAllDept")
    const sql = `SELECT * FROM department`;

    return db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((e) => console.log(e));
  }
  // DONE
  viewAllRoles() {
    //   console.log("inside viewAllDept")
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    LEFT JOIN department 
    ON role.department_id = department.id;`;

    return db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((e) => console.log(e));
  }
  // DONE
  viewAllEmployees() {
    //   console.log("inside viewAllDept")
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary  
    FROM employee 
    LEFT JOIN role 
    ON employee.role_id = role.id  
    LEFT JOIN department 
    ON role.department_id = department.id`;

    return db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((e) => console.log(e));
  }
  // DONE
  addDept(values) {
    console.log(values.addDept);
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const arg = values.addDept;

    return db
      .promise()
      .query(sql, arg)
      .then((res, e) => {
        if (e) {
          throw e;
        } else {
          console.log("The new Department has been successfully added");
          return res;
        }
      });
  }
  // DONE
  addRole(values) {
    // console.log(values.addRole, values.salary, values.dept);
    let title = values.addRole;
    let salary = values.salary;
    // NEED TO HAVE A GET DEPT ID FUNCTION USING DEPT NAME TO FIND ID
    return getDeptID(values.dept).then((dept) => {
      // console.log("this is depID:", dept);
      const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;
      const arg = [title, salary, deptID];

      return db
        .promise()
        .query(sql, arg)
        .then((res, e) => {
          if (e) {
            throw e;
          } else {
            console.log(
              "The new Role has been successfully added to the database."
            );
            return;
          }
        });
    });
  }
}
  // DONE
const addDeptPrompt = () => {
  return inquirer.prompt({
    type: "input",
    name: "addDept",
    message: "Enter a name for the new Department.",
  });
};
  // DONE
const addRolePrompt = (depts) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "addRole",
      message: "Enter a title for the new Role.",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the new Role.",
    },
    {
      type: "list",
      name: "dept",
      message: "Enter the Department that this new Role belongs too",
      choices: depts,
    },
  ]);
};

// const addEmployee = () => {

// }

// const returnCurrentList = () => {

// }

// ---------EMPLOYEES QUERY WITH MANAGER INCLUDED (ITS BROKEN ATM)-----------------
// SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(employee.first_name, '', employee.last_name) WHERE employee.manager_id=employee.id
// FROM employee
// LEFT JOIN role
// ON employee.role_id = role.id
// LEFT JOIN department
// ON role.department_id = department.id
//

module.exports = { User, addDeptPrompt, addRolePrompt };
