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

module.exports = returnRolesList;