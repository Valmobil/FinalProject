package ua.com.danit.dto;

import ua.com.danit.entity.Car;
import ua.com.danit.entity.UserPoint;

import java.util.List;

public class UserRequest {
  private String userName;
  private String userPhone;
  private String userMail;
  private String userPhoto;
  private List<Car> cars;
}
