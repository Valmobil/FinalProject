-- File just for test purposes only
-- we fill some rows with test data
-- it works just for H2 DB
insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token, user_Token_Valid_To) values (1, 'Anrdew', '+380504434665', '12345', 'andrew@gmail.com','/UserPhotos/1.jpg', 'd7654464-da2c-4efc-ac38-b9cbb0011d1f', '2019-03-15 09:30:50')
insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token, user_Token_Valid_To) values (2, 'Oleg', '+380685053223', '67890', 'oleg@gmail.com','/UserPhotos/2.jpg', 'fd220faf-cb9f-4e07-8510-0f325050e3cc', '2019-03-21 21:30:55')
insert into car (car_Id, user_id, car_Name, car_Colour, car_Photo) values (1, 1, 'Mercedes','Red','/CarsPhotos/1_1.jpg')
insert into car (car_Id, user_id, car_Name, car_Colour, car_Photo) values (2, 1, 'Opel','Blue','/CarsPhotos/2_1.jpg')
insert into car (car_Id, user_id, car_Name, car_Colour, car_Photo) values (3, 2, 'Cadillac','Blue','/CarsPhotos/2_2.jpg')