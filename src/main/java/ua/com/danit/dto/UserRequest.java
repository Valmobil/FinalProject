package ua.com.danit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.com.danit.entity.Car;
import ua.com.danit.entity.UserPoint;

import java.util.List;

@Data
public class UserRequest {
  private String userName;
  private String userPhone;
  private String userMail;
  private String userPhoto;
//  private List<Car> cars;
}
