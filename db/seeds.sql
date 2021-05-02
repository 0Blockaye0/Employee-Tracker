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
    ('Senior Engineer', 120000.00, 2),
    ('Junior Engineer', 75000.00, 2),
    ('Mareketing Specialist', 55000.00, 3),
    ('Marketing Director', 75000.00, 3),
    ('Warehouse Crew', 35500.00, 4),
    ('Warehouse Manager', 55000.00, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 2),
  ('Piers', 'Gaveston', 1, 3),
  ('Charles', 'LeRoi', 2, 4),
  ('Katherine', 'Mansfield', 2, 5),
  ('Dora', 'Carrington', 3, 6),
  ('Edward', 'Bellamy', 3, 7),
  ('Montague', 'Summers', 3, 7),
  ('Octavia', 'Butler', 3, 8);  