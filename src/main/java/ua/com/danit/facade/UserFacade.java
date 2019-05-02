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

  @Autowired
  public UserFacade(UsersService usersService) {
    this.usersService = usersService;
  }

  public UserResponse mapEntityToResponce(User user) {
    UserResponse userResponse = modelMapper.map(user, UserResponse.class);
    return userResponse;
  }


}
