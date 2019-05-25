package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserPointResponse;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.service.UserPointsService;

import java.util.LinkedList;
import java.util.List;

@Component
public class UserPointFacade extends AbstractDtoFacade<UserPoint, UserPointResponse, UserPointResponse> {
  private UserPointsService userPointsService;

  @Autowired
  public UserPointFacade(UserPointsService userPointsService) {
    this.userPointsService = userPointsService;
  }

  public String saveUserPoints(List<UserPointResponse> userPointResponses, User user) {
    if (user != null) {
      List<UserPoint> userPoints = new LinkedList<>();
      for (UserPointResponse userPointResponse : userPointResponses) {
        UserPoint userPoint = mapRequestDtoToEntity(userPointResponse);
        userPoints.add(userPoint);
        userPoint.setUser(user);
      }
      return userPointsService.saveUserPoints(userPoints, user);
    }
    throw new ApplicationException("Error! User not found with this access token!");
  }

}
