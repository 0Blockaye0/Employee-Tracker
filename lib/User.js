const db = require("../db/connection");
const cTable = require("console.table");
const init = require('../userPrompt');
// import {init} from '../userPrompt';

class User {
  constructor() {
    //    DO I NEED ANYTHING HERE?
  }

  viewAllDept() {
    //   console.log("inside viewAllDept")
    const sql = `SELECT * FROM department`;

    db.promise()
      .query(sql)
      .then(([rows, fields]) => {
        console.table(rows);
        return
      })
      .catch(console.log)
      .then(() => db.end);
  }

  viewAllRoles() {
      //   console.log("inside viewAllDept")
    const sql = `SELECT * FROM role`;

    db.promise()
      .query(sql)
      .then(([rows, fields]) => {
        console.table(rows);
        return
      })
      .catch(console.log)
      .then(() => db.end);
  }

  viewAllEmployees() {
    //   console.log("inside viewAllDept")
  const sql = `SELECT * FROM employee`;

  db.promise()
    .query(sql)
    .then(([rows, fields]) => {
      console.table(rows);
      return
    })
    .catch(console.log)
    .then(() => db.end);
}
}

module.exports = User;
