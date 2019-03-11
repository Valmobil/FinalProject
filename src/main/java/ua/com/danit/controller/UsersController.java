package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserLogin;
import ua.com.danit.service.UsersService;

@RestController
@RequestMapping("api/users")
public class UsersController {
  private UsersService usersService;

  @Autowired
  public UsersController(UsersService usersService) {
    this.usersService = usersService;
  }

  @PostMapping("login")
  public User postLoginReturnUser(@RequestBody UserLogin userLogin) {
    return usersService.checkUserCredentials(userLogin);
  }

  @PostMapping("{user_id}")
  public User getUserById(@PathVariable("user_id") Long userId) {
    return usersService.getUserById(userId);
  }

  @GetMapping("test")
  public User getUserById() {
    //Write check in DB the user existence and return user data
    return usersService.getUserById(1L);
  }
}
