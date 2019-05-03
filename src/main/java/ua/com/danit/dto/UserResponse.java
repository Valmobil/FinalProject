package ua.com.danit.dto;

import lombok.Data;
import ua.com.danit.entity.UserCar;
import ua.com.danit.entity.UserPoint;
import java.util.List;

@Data
public class UserResponse {
  private String userName;
  private String userPhone;
  private String userMail;
  private String userPhoto;
  private Integer userIsOkUserPhoto;
  private Integer userIsOkCarPhoto;
  private Integer userIsConfirmedMail;
  private Integer userIsConfirmedPhone;
  private String userTokenRefresh;
  private String userTokenAccess;
  private List<UserCar> userCars;
  private List<UserPointResponse> userPoints;
}
