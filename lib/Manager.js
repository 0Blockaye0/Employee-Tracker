const db = require("../db/connection");
// DONE
async function returnManagerList() {
  const sql = `SELECT DISTINCT CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager
    on manager.id = employee.manager_id;`;

  return db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      // console.log(rows);
      let managerNames = [];
      rows.forEach((element) => {
        if (element.manager === null) {
          element.manager = "null";
        }
        managerNames.push(element.manager);
      });
    //   console.log(managerNames);
      return managerNames;
    })
    .catch((e) => console.log(e));
}
// DONE
async function getManagerID(arg) {
    // console.log('this is arg: ', arg);
    if (arg === null) {
        return null;
        // return arg = null;
    }
  const sql = `SELECT id
    FROM employee
    WHERE CONCAT(first_name, ' ', last_name) = ?;`;

  return db
    .promise()
    .query(sql, arg)
    .then((res, e) => {
      if (e) {
        throw e;
      } else {
        return res[0];
      }
    });
}

module.exports = { returnManagerList, getManagerID };
