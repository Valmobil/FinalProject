-- File just for test purposes only
-- we fill some rows with test data
-- it works just for H2 DB
insert into [user] (user_Id, user_Name, user_Phone, user_Password, user_Mail) values (1, 'Anrdew', '0504434665', '12345', 'andrew@gmail.com')
insert into [user] (user_Id, user_Name, user_Phone, user_Password, user_Mail) values (2, 'Oleg', '0685053223', '67890', 'oleg@gmail.com')
insert into car (car_Id, user_id, car_Name, car_Colour, car_Link_To_Photo) values (1, 1, 'Mercedes','Red','/CarsPhotos/1_1')
insert into car (car_Id, user_id, car_Name, car_Colour, car_Link_To_Photo) values (2, 1, 'Opel','Blue','/CarsPhotos/2_1')
insert into car (car_Id, user_id, car_Name, car_Colour, car_Link_To_Photo) values (3, 2, 'Cadillac','Blue','/CarsPhotos/2_2')
