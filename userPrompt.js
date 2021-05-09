const inquirer = require("inquirer");
const returnRolesList = require("./lib/Role");
// const db = require('./db/connection')
const { User, addDeptPrompt, addRolePrompt } = require("./lib/User");
const user = new User();
const { returnDeptList } = require("./lib/Dept");

const init = () => {
  inquirer
    .prompt({
      type: "rawlist",
      name: "mainMenu",
      message: `
                  MAIN MENU
              ------------------
            PLease select an option.
            `,
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Return to Main Menu",
      ],
    })
    .then((data) => {
      switch (data.mainMenu) {
        case "View all Departments":
          //   console.log("inside switch statement");
          user
            .viewAllDept()
            .then((rows) => {
              console.table(rows);
            })
            .then(() => {
              init();
            });
          // init();
          break;

        case "View all Roles":
          user
            .viewAllRoles()
            .then((rows) => {
              console.table(rows);
            })
            .then(() => {
              init();
            });
          break;

        case "View all Employees":
          user
            .viewAllEmployees()
            .then((rows) => {
              console.table(rows);
            })
            .then(() => {
              init();
            });
          break;

        case "Add a Department":
          addDeptPrompt().then((res) => {
            user.addDept(res).then(() => {
              init();
            });
          });
          break;

        case "Add a Role":
          returnDeptList().then((depts) => {
            // console.log('depts inside switch case:', depts);

            addRolePrompt(depts).then((res) => {
              user.addRole(res).then(() => {
                init();
              });
            });
          });
          break;

        case "Add an Employee":
          // function
          break;

        case "Update an Employee Role":
          // function
          break;

        case "Return to Main Menu":
          init();
          break;

        // default:
        //   return quit();
      }
    });
};

// ALL EMPLOYEES QUERY
// SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary  FROM employee LEFT JOIN role ON employee.role_id LEFT JOIN department ON role.department_id;

// ALL EMPLOYEES REQUIRED DATA/ROWS
// employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers

module.exports = init;

// CONNECT TO DATABASE
// db.connect((err) => {
//     if (err) throw err;
//     console.log("Database connected.");
//     // app.listen(PORT, () => {
//     //   console.log(`Server running on port ${PORT}`);
//     // });
//   });
