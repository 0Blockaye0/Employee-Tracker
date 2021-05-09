const db = require("../db/connection");

async function returnDeptList() {
  const sql = `SELECT name
    FROM department`;

  return db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
        let depts = []
      rows.forEach(element => {
          depts.push(element.name)
      });
    //   console.log(depts);
      return depts
    })
    .catch((e) => console.log(e));
}

async function getDeptID(dept) {
    const sql = `SELECT department.id 
    FROM department 
    WHERE department.name = ?`

    return db
    .promise()
    .query(sql, dept)
    .then(([row, fields]) => {
        deptID = row[0].id;
        return deptID
    })
    .catch((e) => console.log(e));
}

module.exports = { returnDeptList, getDeptID };