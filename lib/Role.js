const db = require('../db/connection');

async function returnRolesList() {
  const sql = `SELECT title
      FROM role`;

  return db
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      let roleTitles = [];
      rows.forEach((element) => {
        roleTitles.push(element.title);
      });
      //   console.log(depts);
      return roleTitles;
    })
    .catch((e) => console.log(e));
}

async function getRoleID(arg) {
  // console.log('this is arg: ', arg);
 
const sql = `SELECT id
  FROM role
  WHERE role.title = ?;`;

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

module.exports = { returnRolesList, getRoleID };