package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.User;
import ua.com.danit.model.UserInfo;
import ua.com.danit.service.UserTokensService;
import ua.com.danit.service.UsersService;

@RestController
@RequestMapping("api/users")
public class UsersController {
  private UsersService usersService;
  private UserTokensService userTokensService;

  @Autowired
  public UsersController(UsersService usersService, UserTokensService userTokensService) {
    this.usersService = usersService;
    this.userTokensService = userTokensService;
  }

  @PutMapping("")
  public UserInfo saveUserProfile(@RequestBody User user, @RequestHeader String userTokenAccess) {
    return usersService.saveUserProfile(user, userTokensService.findUserByAccessToken(userTokenAccess));
  }

  @GetMapping("test")
  public User getUserById() {
    //Write check in DB the user existence and return user data
    return usersService.getUserById(1L);
  }

}
