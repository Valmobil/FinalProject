-- File just for test purposes only
-- we fill some rows with test data
-- it works just for H2 DB
-- MUST BE COMMENTED TO WORK WITH MYSQL
-- insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token_Access) values (1, 'Anrdew', '+380504434665', '12345', 'andrew@gmail.com', '/UserPhotos/1.jpg',        'd7654464-da2c-4efc-ac38-b9cbb0011d1f')
-- insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token_Access) values (2, 'Oleg', '+380685053223', '12345', 'oleg@gmail.com', '/UserPhotos/2.jpg', 'fd220faf-cb9f-4e07-8510-0f325050e3cc')
-- insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token_Access) values (3, 'Marichka', '+380679984536', '12345', 'marichka@gmail.com', '/UserPhotos/3.jpg', '')
-- insert into user (user_Id, user_Name, user_Phone, user_Password, user_Mail, user_Photo, user_Token_Access) values (4, 'Galynka', '+380503337744', '12345', 'galynka@gmail.com', '/UserPhotos/4.jpg', '')
-- insert into car (car_Id, car_user_id, car_Name, car_Colour, car_Photo) values (1, 1, 'Mercedes', 'Red', '/CarsPhotos/1_1.jpg')
-- insert into car (car_Id, car_user_id, car_Name, car_Colour, car_Photo) values (2, 1, 'Opel', 'Blue', '/CarsPhotos/2_1.jpg')
-- insert into car (car_Id, car_user_id, car_Name, car_Colour, car_Photo) values (3, 2, 'Cadillac', 'Blue', '/CarsPhotos/2_2.jpg')
-- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_SITS_QTY) values (1, '2019-03-15T07:15:00', 1, 1, 3)
-- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_SITS_QTY) values (2, '2019-03-16T20:00:00', 2, 2, 4)
-- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_SITS_QTY) values (3, '2019-03-16T20:00:00', null, 3, 1)
-- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_SITS_QTY) values (4, '2019-03-16T20:00:00', null, 4, 2)
-- -- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_IS_FOR_DRIVER) values (1, '2019-03-15T07:15:00', 1, 1, 1)
-- -- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_IS_FOR_DRIVER) values (2, '2019-03-16T20:00:00', 2, 2, 1)
-- -- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_IS_FOR_DRIVER) values (3, '2019-03-16T20:00:00', null, 1, 0)
-- -- insert into trip (TRIP_ID, TRIP_DATE_TIME, TRIP_CAR_ID, TRIP_USER_ID, TRIP_IS_FOR_DRIVER) values (4, '2019-03-16T20:00:00', null, 2, 0)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (1, 'DAN-IT', 'ДАН-АЙТИ', 'ДАН-АЙТІ', 50.429398, 30.593251)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (3, 'ZHULYANI aeroport', 'аэропорт ЖУЛЯНЫ', 'аеропорт ім. Сікорського', 50.412050, 30.443301)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (4, 'BORYSPIL', 'БОРИСПОЛЬ', 'БОРИСПІЛЬ', 50.348094, 30.956806)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (5, 'IRPEN', 'ИРПЕНЬ', 'ІРПІНЬ', 50.518624, 30.239137)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (6, 'BROVARY', 'БРОВАРЫ', 'БРОВАРИ', 50.505748, 30.797649)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (7, 'VYSHNEVE', 'ВИШНЕВОЕ', 'ВИШНЕВЕ', 50.392563, 30.374559)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (8, 'KHRESHATYK', 'КРЕЩАТИК', 'ХРЕЩАТИК', 50.447340, 30.522238)
-- insert into point (point_Id, point_Name_En, point_Name_Ru, point_Name_UA, point_Longitude, point_Latitude) values (2, 'PETROVKA', 'ПЕТРОВКА', 'ПОЧАЙНА', 50.486616, 30.497757)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (1, 'Home', 50.429398, 30.593251, 1, 1)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (2, 'аеропорт ім. Сікорського', 50.412050, 30.443301,2,1)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (3, 'Work', 50.447340, 30.522238,3,1)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (4, 'Sklozavod', 50.429398, 30.593251, 1, 2)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (5, 'AkademGorodok', 50.447340, 30.522238,2,2)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (6, 'Home', 50.429398, 30.593251, 1, 4)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (7, 'аеропорт ім. Сікорського', 50.412050, 30.443301,2,4)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (8, 'Work', 50.447340, 30.522238,3,4)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (9, 'Sklozavod', 50.429398, 30.593251, 1, 3)
-- insert into trip_point (TRIP_POINT_ID, TRIP_POINT_NAME, TRIP_POINT_LONGITUDE, TRIP_POINT_LATITUDE, TRIP_POINT_SEQUENCE, TRIP_POINT_TRIP_ID) values (10, 'AkademGorodok', 50.447340, 30.522238,2,3)
-- insert into TRIP_PASSENGER (TRIP_PASSENGER_ID, TRIP_PASSENGER_DRIVER_TRIP_ID,  	TRIP_PASSENGER_TRIP_ID,trip_Passenger_Empty_Sits_Qty) values (1, 1, 4, 1)
-- insert into TRIP_PASSENGER (TRIP_PASSENGER_ID, TRIP_PASSENGER_DRIVER_TRIP_ID,  	TRIP_PASSENGER_TRIP_ID,trip_Passenger_Empty_Sits_Qty) values (2, 2, 3, 2)
-- insert into feedback (FEEDBACK_ID, FEEDBACK_VALUE, FEEDBACK_DRIVER_TRIP_ID, FEEDBACK_PASSENGER_TRIP_ID) values (1, 1, 1, 4)
-- INSERT INTO roles(name) VALUES ('ROLE_USER');
-- INSERT INTO roles(name) VALUES ('ROLE_ADMIN');

-- FOR MYSQL DB:
INSERT INTO roles(name)
VALUES ('ROLE_USER');
INSERT INTO roles(name)
VALUES ('ROLE_ADMIN');
