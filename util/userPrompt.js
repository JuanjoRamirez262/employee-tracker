const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config()

const tableNames = {
    employee: 'employee',
    role: 'role',
    department: 'department'
}

const nextAction = () => {
    return inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'nextAction',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Deparments', 'Add Department', 'Quit']
    })
}

const newDepartmentPrompt = () => {
    return inquirer.prompt(
        {
            type: 'text',
            message: 'What is the name of the department?',
            name: 'departmentName',
        }
    )
}

const newRolePrompt = (departments) => {
    return inquirer.prompt([
        {
            type: 'text',
            message: 'What is the name of the role?',
            name: 'roleName',
        },
        {
            type: 'text',
            message: 'What is the salary of the role?',
            name: 'roleSalary',
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'roleDepartment',
            choices: departments
        }
    ])
}

const newEmployeePrompt = (roles, managers) => {
    managers.push('None')
    return inquirer.prompt([
        {
            type: 'text',
            message: 'What is the employee\'s first name?',
            name: 'employeeFirstName',
        },
        {
            type: 'text',
            message: 'What is the employee\'s last name?',
            name: 'employeeLastName',
        },
        {
            type: 'list',
            message: 'What is the employee\'s role?',
            name: 'employeeRole',
            choices: roles
        },
        {
            type: 'list',
            message: 'What is the employee\'s manager?',
            name: 'employeeManager',
            choices: managers
        }
    ])
}

const viewAllTable = async (tableName) => {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const [rows, fields] = await conn.query(`SELECT * FROM ${tableName}`);
    await conn.end();
    return rows
}

const addDepartment = async () => {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const { departmentName } = await newDepartmentPrompt();
    await conn.execute(`INSERT INTO department(name) VALUES ('${departmentName}')`);
    await conn.end();
}

const addRole = async () => {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const [rows, fields] = await conn.query(`SELECT * FROM department`);
    const departments = await rows.map(item => item.name)
    const { roleName, roleSalary, roleDepartment } = await newRolePrompt(departments)
    const [rows2, fields2] = await conn.query(`SELECT * FROM department WHERE name='${roleDepartment}'`);
    await conn.execute(`INSERT INTO role (title, salary, department_id) VALUES ('${roleName}', ${roleSalary}, ${rows2[0].id})`);
    await conn.end();
}

const addEmployee = async () => {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    const [role, fields] = await conn.query(`SELECT * FROM role`);
    const roles = await role.map(item => item.title)
    const [manager, fields2] = await conn.query(`SELECT * FROM employee`);
    const managers = await manager.map(item => item.last_name)
    const { employeeFirstName, employeeLastName, employeeRole, employeeManager } = await newEmployeePrompt(roles, managers)
    const [roleId, fields3] = await conn.query(`SELECT * FROM role WHERE title='${employeeRole}'`);
    const [managerId, fields4] = await conn.query(`SELECT * FROM employee WHERE last_name='${employeeManager}'`);
    await conn.execute(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeFirstName}', '${employeeLastName}', ${roleId[0].id}, ${managerId[0].id})`);
    await conn.end();
}

const updateEmployeeRole = async() => {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    

    await conn.end();
}

module.exports = {
    tableNames, nextAction, viewAllTable, addDepartment, addRole, addEmployee, updateEmployeeRole
}