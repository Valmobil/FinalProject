package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Users;
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
  public Users postLoginReturnUsers(@RequestBody Users users) {
    //Write check in DB the user existance and return users data
    return users;
  }

  @GetMapping("current")
  public Users getReturnCurrentUsers(@RequestBody Users users) {
    //Write check in DB the user existence and return users data
    return usersService.getUsersById(1L);
  }

}
