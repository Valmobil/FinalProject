package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserRequest;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.entity.User;
import ua.com.danit.service.UsersService;

@Component
public class UserFacade extends AbstractDtoFacade<User, UserRequest, UserResponse> {
  private UsersService usersService;
  private UserPointFacade userPointFacade;
  private UserCarFacade userCarFacade;

  @Autowired
  public UserFacade(UsersService usersService,
                    UserPointFacade userPointFacade,
                    UserCarFacade userCarFacade) {
    this.usersService = usersService;
    this.userPointFacade = userPointFacade;
    this.userCarFacade = userCarFacade;
  }

  public UserResponse mapEntityToResponse(User user) {
    UserResponse userResponse = modelMapper.map(user, UserResponse.class);
    userResponse.setUserTokenRefresh(user.getUserTokens().get(0).getUserTokenRefresh());
    userResponse.setUserTokenAccess(user.getUserTokens().get(0).getUserTokenAccess());
    userResponse.setUserPoints(userPointFacade.mapEntityListToResponseDtoList(user.getUserPoints()));
    userResponse.setUserCars(userCarFacade.mapEntityListToResponseDtoList(user.getUserCars()));
    return userResponse;
  }
}
