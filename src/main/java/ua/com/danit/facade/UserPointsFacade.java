package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dao.userPoint.UserPointRequest;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.service.UserPointsService;

import javax.xml.ws.Action;
import java.util.List;

@Component
public class UserPointsFacade extends AbstractDtoFacade<UserPoint, UserPointRequest, UserPointRequest> {
  private UserPointsService userPointsService;

  @Autowired
  public UserPointsFacade(UserPointsService userPointsService) {
    this.userPointsService = userPointsService;
  }

  public String saveUserPoints(List<UserPointRequest> userPointRequests, User user) {
    List<UserPoint> userPoints = getAll(userPointRequests);

  }

}
