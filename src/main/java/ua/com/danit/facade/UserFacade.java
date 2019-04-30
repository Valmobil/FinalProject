package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserPointResponce;
import ua.com.danit.dto.UserRequest;
import ua.com.danit.dto.UserResponce;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.service.UserPointsService;
import ua.com.danit.service.UsersService;

import java.util.LinkedList;
import java.util.List;

@Component
public class UserFacade extends AbstractDtoFacade<User, UserRequest, UserResponce> {
  private UsersService usersService;

  @Autowired
  public UserFacade(UsersService usersService) {
    this.usersService = usersService;
  }

  public UserResponce mapEntityToResponce(User user) {
    UserResponce userResponce = modelMapper.map(user, UserResponce.class);
    return userResponce;
  }

  public String saveUserPoints(List<UserPointResponce> userPointResponces, User user) {
    return null;
  }

}
