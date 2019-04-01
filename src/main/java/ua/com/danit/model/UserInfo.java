package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.com.danit.entity.Car;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
  private User user;
  private List<Car> cars;
  private List<UserPoint> userPoints;
  private String message;
}
