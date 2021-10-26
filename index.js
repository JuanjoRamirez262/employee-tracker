const userPrompt = require('./util/userPrompt')
const console = require('console');

const init = async() => {
    const nextAction = await userPrompt.nextAction();
    let response;
    let quit = false;
    switch(nextAction.nextAction){
        case 'View All Employees':
            response = await userPrompt.viewAllTable(userPrompt.tableNames.employee);
            console.table(response)
            break;
        case 'Add Employee':
            await userPrompt.addEmployee();
            break;
        case 'Update Employee Role':
            console.log('3')
            break;
        case 'View All Roles':
            response = await userPrompt.viewAllTable(userPrompt.tableNames.role);
            console.table(response)
            break;
        case 'Add Role':
            await userPrompt.addRole()
            break;
        case 'View All Deparments':
            response = await userPrompt.viewAllTable(userPrompt.tableNames.department);
            console.table(response)
            break;
        case 'Add Department':
            await userPrompt.addDepartment()
            break;
        case 'Quit':
            quit = true
            break;
    }
    if(!quit){
        await init();
        
    }
    return;
}

init();