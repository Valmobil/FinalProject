package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.userPoint.UserPointResponce;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.service.UserPointsService;

import java.util.LinkedList;
import java.util.List;

@Component
public class UserPointsFacade extends AbstractDtoFacade<ua.com.danit.entity.UserPoint, UserPointResponce, UserPointResponce> {
  private UserPointsService userPointsService;

  @Autowired
  public UserPointsFacade(UserPointsService userPointsService) {
    this.userPointsService = userPointsService;
  }

  public String saveUserPoints(List<UserPointResponce> userPointResponces, User user) {
    if (user != null) {
      List<UserPoint> userPoints = new LinkedList<>();
      for (UserPointResponce userPointResponce : userPointResponces) {
        UserPoint userPoint = mapRequestDtoToEntity(userPointResponce);
        userPoints.add(userPoint);
        userPoint.setUser(user);
      }
      return userPointsService.saveUserPoints(userPoints, user);
    }
    return null;
  }

}
