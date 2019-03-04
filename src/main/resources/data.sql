-- File just for test purposes only
-- we fill some rows with test data
-- it works just for H2 DB
insert into users (users_Id, users_Name, users_Phone, users_Password, users_Mail, users_Cars_Id) values (1, 'Anrdew', '0504434665', '12345', 'andrew@gmail.com')
insert into users (users_Id, users_Name, users_Phone, users_Password, users_Mail) values (2, 'Oleg', '06850532223', '67890', 'oleg@gmail.com')
insert into cars (cars_Id, cars_users_id, cars_Name) values (1, 1, 'Mercedes')
insert into cars (cars_Id, cars_users_id, cars_Name) values (2, 1, 'Opel')
insert into cars (cars_Id, cars_users_id, cars_Name) values (3, 2, 'Cadillac')
