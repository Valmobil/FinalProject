package ua.com.danit.dto;

import ua.com.danit.entity.Car;
import ua.com.danit.entity.UserPoint;
import java.util.List;

public class UserResponce {
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
  private List<Car> cars;
  private List<UserPoint> userPoints;
}
