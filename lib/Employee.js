const db = require("../db/connection");

async function returnEmployeeList() {
  const sql = `SELECT CONCAT(first_name, ' ', last_name) AS name, id
    FROM employee`;

  return db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
    //   console.log('useerFile/returnEmployeeList:', rows);
      return rows;
    });
}

module.exports = { returnEmployeeList };
