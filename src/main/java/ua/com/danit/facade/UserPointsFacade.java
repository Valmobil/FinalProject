package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dao.userPoint.UserPointResponce;
import ua.com.danit.entity.User;
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

  public List<ua.com.danit.entity.UserPoint> saveUserPoints(List<UserPointResponce> pointResponces, User user) {
    List<ua.com.danit.entity.UserPoint> userPoints = new LinkedList<>();
    for (UserPointResponce userPointResponce: pointResponces) {
        UserPointResponce userPoint = mapRequestDtoToEntity(userPointResponce);
      userPoints.add(userPoint);

    }
    userPointsService.saveUserPoints(userPoints, user);
    return userPoints;
  }

}
