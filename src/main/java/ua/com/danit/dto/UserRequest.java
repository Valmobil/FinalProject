package ua.com.danit.dto;

import lombok.Data;
import ua.com.danit.entity.UserCar;

import java.util.List;

@Data
public class UserRequest {
  private String userName;
  private String userPhone;
  private String userMail;
  private String userPhoto;
  private List<UserCar> userCars;
}
