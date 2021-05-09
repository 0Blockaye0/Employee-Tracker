const db = require("../db/connection");
const cTable = require("console.table");
// const init = require("../userPrompt");
// import {init} from '../userPrompt';

class User {
  constructor() {
    //    DO I NEED ANYTHING HERE?
  }

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

  // addRole() {

  // }
}

// ---------EMPLOYEES QUERY WITH MANAGER INCLUDED (ITS BROKEN ATM)-----------------
// SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(employee.first_name, '', employee.last_name) WHERE employee.manager_id=employee.id  
// FROM employee 
// LEFT JOIN role 
// ON employee.role_id = role.id  
// LEFT JOIN department 
// ON role.department_id = department.id
// 


module.exports = User;
