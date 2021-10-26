SELECT * FROM department; 
SELECT * FROM role; 
SELECT role.id, role.title, role.salary
FROM role
JOIN department ON role.department_id = department_id;