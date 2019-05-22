package ua.com.danit.dto;

import lombok.Data;
import ua.com.danit.entity.UserCar;

import java.util.List;

@Data
public class UserResponseTrip {
  private String userName;
  private String userPhone;
  private String userPhoto;
}
