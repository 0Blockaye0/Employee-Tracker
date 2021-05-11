const inquirer = require("inquirer");
const {
  User,
  addDeptPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeePrompt,
} = require("./lib/User");
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
          addEmployeePrompt()
            .then((res) => {
              user.addEmployee(res);
              // console.log(res);
            })
            .then(() => {
              init();
            });
          break;

        case "Update an Employee Role":
          updateEmployeePrompt().then((res) => {
            // console.log(res);
            user.updateEmployee(res).then(() => {
              init();
            });
          });
          break;

        case "Return to Main Menu":
          init();
          break;

        // default:
        //   return quit();
      }
    });
};

module.exports = init;