INSERT INTO department (name)
VALUES ('Sales'),
       ('HHRR'),
       ('Legal'),
       ('Development'); 

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 250000, 1),
       ('Salesman', 70000, 1),
       ('HHRR Manager', 200000, 2),
       ('Recluter', 100000, 2),
       ('Lawyer Manager', 250000, 3),
       ('Lawyer', 150000, 3),
       ('Engineer Manager', 250000, 4),
       ('Software Engineer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Juan', 'Juanes', 1, NULL),
       ('Jose', 'Jose', 2, 1),
       ('Ramiro', 'Ramirez', 3, NULL),
       ('Camilo', 'Camilin', 4, 3),
       ('JF', 'Keneddy', 5, NULL),
       ('JJ', 'Ramirez', 6, 5),
       ('Benja', 'Martinez', 7, NULL), 
       ('Pepe', 'Gilmore', 8, 7);