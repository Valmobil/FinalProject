package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserResponseTrip;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.entity.User;
import ua.com.danit.service.ImageDbProviderImpl;

@Component
public class UserFacade extends AbstractDtoFacade<User, UserResponseTrip, UserResponse> {
  private UserPointFacade userPointFacade;
  private UserCarFacade userCarFacade;

  @Autowired
  public UserFacade(UserPointFacade userPointFacade,
                    UserCarFacade userCarFacade) {
    this.userPointFacade = userPointFacade;
    this.userCarFacade = userCarFacade;
  }

  public UserResponse mapEntityToResponse(User user) {
    UserResponse userResponse = modelMapper.map(user, UserResponse.class);
    userResponse.setUserTokenRefresh(user.getUserTokens().get(0).getUserTokenRefresh());
    userResponse.setUserTokenAccess(user.getUserTokens().get(0).getUserTokenAccess());
    userResponse.setUserPoints(userPointFacade.mapEntityListToResponseDtoList(user.getUserPoints()));
    userResponse.setUserCars(userCarFacade.mapEntityListToResponseDtoList(user.getUserCars()));
    userResponse.setUserPhoto(user.getUserPhoto());
    return userResponse;
  }
}
