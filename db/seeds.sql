INSERT INTO department (name)
VALUES 
   ('Sales'),
   ('Engineering'),
   ('Marketing'),
   ('Distribution'),
   ('Managment');


INSERT INTO role (title, salary, department_id)
VALUES
   ('Salesperon', 45000.00, 1),
   ('Sales Lead', 55500.00, 1),
   ('Senior Engineer', 120000.00, 5),
   ('Junior Engineer', 75000.00, 2),
   ('Mareketing Specialist', 55000.00, 3),
   ('Marketing Director', 75000.00, 5),
   ('Warehouse Crew', 35500.00, 4),
   ('Warehouse Manager', 55000.00, 5);





INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dora', 'Carrington', 3, NULL),
    ('Katherine', 'Mansfield', 6, NULL),
    ('Octavia', 'Butler', 8, NULL),
    ('Ronald', 'Firbank', 1, 2),
    ('Virginia', 'Woolf', 1, 2),
    ('Piers', 'Gaveston', 2, 2),
    ('Charles', 'LeRoi', 4, 1),
    ('Edward', 'Bellamy', 5, 2),
    ('Montague', 'Summers', 7, 3),
    ('James', 'Johnson', 7, 3),
    ('Levi', 'Winter', 7, 3),
    ('Pugsley', 'Adams', 7, 3);
    