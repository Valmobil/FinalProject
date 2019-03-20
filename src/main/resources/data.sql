-- File just for test purposes only
-- we fill some rows with test data
-- it works just for H2 DB
insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token, user_Token_Valid_To) values (1, 'Anrdew', '+380504434665', '12345', 'andrew@gmail.com','/UserPhotos/1.jpg', 'd7654464-da2c-4efc-ac38-b9cbb0011d1f', '2019-03-15 09:30:50')
insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token, user_Token_Valid_To) values (2, 'Oleg', '+380685053223', '67890', 'oleg@gmail.com','/UserPhotos/2.jpg', 'fd220faf-cb9f-4e07-8510-0f325050e3cc', '2019-03-21 21:30:55')
insert into car (car_Id, car_user_id, car_Name, car_Colour, car_Photo) values (1, 1, 'Mercedes','Red','/CarsPhotos/1_1.jpg')
insert into car (car_Id, car_user_id, car_Name, car_Colour, car_Photo) values (2, 1, 'Opel','Blue','/CarsPhotos/2_1.jpg')
insert into car (car_Id, car_user_id, car_Name, car_Colour, car_Photo) values (3, 2, 'Cadillac','Blue','/CarsPhotos/2_2.jpg')
insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID) values (1, '2019-03-15T07:15:00', 1,1)
insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID) values (2, '2019-03-16T20:00:00', 2,1)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (1, 'DAN-IT', 'ДАН-АЙТИ', 'ДАН-АЙТІ', 50.429398, 30.593251)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (3, 'ZHULYANI aeroport', 'аэропорт ЖУЛЯНЫ', 'аеропорт ім. Сікорського', 50.412050, 30.443301)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (4, 'BORYSPIL', 'БОРИСПОЛЬ', 'БОРИСПІЛЬ', 50.348094, 30.956806)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (5, 'IRPEN', 'ИРПЕНЬ', 'ІРПІНЬ', 50.518624, 30.239137)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (6, 'BROVARY', 'БРОВАРЫ', 'БРОВАРИ', 50.505748, 30.797649)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (7, 'VYSHNEVE', 'ВИШНЕВОЕ', 'ВИШНЕВЕ', 50.392563, 30.374559)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (8, 'KHRESHATYK', 'КРЕЩАТИК', 'ХРЕЩАТИК', 50.447340, 30.522238)
insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (2, 'PETROVKA', 'ПЕТРОВКА', 'ПОЧАЙНА', 50.486616, 30.497757)
