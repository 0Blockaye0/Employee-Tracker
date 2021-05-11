const db = require("../db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");
const { getDeptID } = require("./Dept");
const { returnManagerList, getManagerID } = require("./Manager");
const { returnEmployeeList } = require("../lib/Employee");
const { returnRolesList } = require("../lib/Role");

class User {
  constructor() {
  }
  
  viewAllDept() {
    //   console.log("inside viewAllDept")
    const sql = `SELECT * FROM department`;

    return db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((e) => console.log(e));
  }
  
  viewAllRoles() {
    //   console.log("inside viewAllDept")
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    LEFT JOIN department 
    ON role.department_id = department.id;`;

    return db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((e) => console.log(e));
  }
  
  viewAllEmployees() {
    //   console.log("inside viewAllDept")
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role 
    ON employee.role_id = role.id  
    LEFT JOIN department 
    ON role.department_id = department.id
    LEFT JOIN employee manager
    on manager.id = employee.manager_id;`;

    return db
      .promise()
      .query(sql)
      .then(([rows, fields]) => {
        return rows;
      })
      .catch((e) => console.log(e));
  }
  
  addDept(values) {
    console.log(values.addDept);
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const arg = values.addDept;

    return db
      .promise()
      .query(sql, arg)
      .then((res, e) => {
        if (e) {
          throw e;
        } else {
          console.log("The new Department has been successfully added");
          return res;
        }
      });
  }
  
  addRole(values) {
    // console.log(values.addRole, values.salary, values.dept);
    let title = values.addRole;
    let salary = values.salary;
    // NEED TO HAVE A GET DEPT ID FUNCTION USING DEPT NAME TO FIND ID
    return getDeptID(values.dept).then((dept) => {
      // console.log("this is depID:", dept);
      const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;
      const arg = [title, salary, deptID];

      return db
        .promise()
        .query(sql, arg)
        .then((res, e) => {
          if (e) {
            throw e;
          } else {
            console.log(
              "The new Role has been successfully added to the database."
            );
            return;
          }
        });
    });
  }
  
  addEmployee(values) {
    // console.log("values: ", values.emplsManager);

    if (values.emplsManager === "null") {
      values.emplsManager = null;
    }

    let firstName = values.firstName;
    let lastName = values.lastName;
    let managerId = [];
    // let role = await getRoleID(values.newEmpRole);
    getManagerID(values.emplsManager)
      .then((manager) => {
        // console.log(manager)
        if (manager === null) {
          managerId.push(null);
          return;
        }
        managerId.push(manager[0].id);
      })
      .then(() => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        const arg = [firstName, lastName, 3, managerId];

        return db
          .promise()
          .query(sql, arg)
          .then((res, e) => {
            if (e) {
              throw e;
            } else {
              console.log(
                "The new Employee has been successfully added to the database."
              );
              return res;
            }
          });
      });
  }
  
  updateEmployee(values) {
    // console.log("inside user.updateEmployee;", values);
    let name = values.employee;
    let roles = values.roles;
    const sql = `UPDATE employee
    SET role_id = (SELECT id
      FROM role
      WHERE title = '?')
    WHERE CONCAT(first_name, ' ', last_name) = '?';`;
    const arg = [roles, name];

    return db
      .promise()
      .query(sql, arg)
      .then((res, e) => {
        if (e) {
          throw e;
        } else {
          console.log(
            "The Employee has been successfully Updated in the database."
          );
          return res;
        }
      });
  }
}

//  | PROMPTS |
//  |         |
//  V         V

const addDeptPrompt = () => {
  return inquirer.prompt({
    type: "input",
    name: "addDept",
    message: "Enter a name for the new Department.",
    validate: (Input) => {
      if (Input) {
        return true;
      } else {
        console.log("This feild cannot be left empty!");
        return false;
      }
    }
  });
};

const addRolePrompt = (depts) => {
  return inquirer.prompt([
    {
      type: "input",
      name: "addRole",
      message: "Enter a title for the new Role.",
      validate: (Input) => {
        if (Input) {
          return true;
        } else {
          console.log("This feild cannot be left empty!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for the new Role.",
      validate: (Input) => {
        if (Input) {
          return true;
        } else {
          console.log("This feild cannot be left empty!");
          return false;
        }
      }
    },
    {
      type: "list",
      name: "dept",
      message: "Enter the Department that this new Role belongs too",
      choices: depts,
    },
  ]);
};

async function addEmployeePrompt() {
  const roleList = await returnRolesList();
  const managerList = await returnManagerList();
  // console.log(managerList);
  // console.log(roleList);

  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter new Employee first name.",
      validate: (Input) => {
        if (Input) {
          return true;
        } else {
          console.log("This feild cannot be left empty!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter new Employee last name.",
      validate: (Input) => {
        if (Input) {
          return true;
        } else {
          console.log("This feild cannot be left empty!");
          return false;
        }
      }
    },
    {
      type: "list",
      name: "newEmpRole",
      message: "Select the Role of the new Employee.",
      choices: [...roleList],
    },
    {
      type: "list",
      name: "emplsManager",
      message: "Select the new Employees Manager",
      choices: [...managerList],
    },
  ]);
}

async function updateEmployeePrompt() {
  const employeeList = await returnEmployeeList();
  const roleList = await returnRolesList();
  return inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Select an Employee to be updated.",
      choices: [...employeeList],
    },
    {
      type: "list",
      name: "roles",
      message: "Select the new Role.",
      choices: [...roleList],
    },
  ]);
}

module.exports = {
  User,
  addDeptPrompt,
  addRolePrompt,
  addEmployeePrompt,
  updateEmployeePrompt,
};
