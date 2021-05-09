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
          user.viewAllDept().then(rows => {
             console.table(`



               ALL DEPARTMENTS
           ------------------------
        ` , rows)
          })
          .then(() => {
            init()
          });
          // init();
          break;

        case "View all Roles":
          user.viewAllRoles().then(rows => {
             console.table(`



                  ALL ROLES
           ------------------------
        ` , rows)
          }).then(() => {
            init();
          })
          break;

        case "View all Employees":
          user.viewAllEmployees().then(rows => {
            console.table(`



                ALL EMPLOYEES
            ----------------------
       ` , rows)
         }).then(() => {
           init();
         })
         break;

        case "Add a Department":
          // function
          break;

        case "Add a Role":
          // function
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

module.exports = init;

// CONNECT TO DATABASE
// db.connect((err) => {
//     if (err) throw err;
//     console.log("Database connected.");
//     // app.listen(PORT, () => {
//     //   console.log(`Server running on port ${PORT}`);
//     // });
//   });
