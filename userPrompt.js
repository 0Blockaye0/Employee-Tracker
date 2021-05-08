const inquirer = require("inquirer");
// const db = require('./db/connection')
const User = require("./lib/User");
const user = new User();

const init = () => {
  inquirer
    .prompt({
      type: "rawlist",
      name: "mainMenu",
      message: `
        MAIN MENU
        ---------
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
      // console.log(data);
      //   const switchFun = () => {
      switch (data.mainMenu) {
        case "View all Departments": //viewDepts:
          //   console.log("inside switch statement");
          user.viewAllDept();
          // console.log("made it back to the switch");
          init();
          break;
        case "View all Roles": //viewRoles:
          user.viewAllRoles();
          init();
          break;
        case "View all Employees": //viewEmployees:
          user.viewAllEmployees();
          init();
          break;
        case "Add a Department": //addDept:
          // function
          break;
        case "Add a Role": //addRole:
          // function
          break;
        case "Add an Employee": //addEmployee:
          // function
          break;
        case "Update an Employee Role": //updateEmployeeRole:
          // function
          break;
        case "Return to Main Menu": //mainMenu:
          init();
          break;
      }
    });
};

module.exports = init;

// CONNECT TO DATABASE
// db.connect((err) => {
//     if (err) throw err;
//     console.log("Database connected.");
//     // app.listen(PORT, () => {
//     //   console.log(`Server running on port ${PORT}`);
//     // });
//   });
