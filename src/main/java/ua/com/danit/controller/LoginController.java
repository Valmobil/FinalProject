package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.model.UserInfo;
import ua.com.danit.model.UserLogin;
import ua.com.danit.service.LoginService;
import ua.com.danit.service.UsersService;

@RestController
@RequestMapping("api/logins")
public class LoginController {
  private UsersService usersService;
  private LoginService loginService;

  @Autowired
  public LoginController(UsersService usersService, LoginService loginService) {
    this.usersService = usersService;
    this.loginService = loginService;
  }

//  @PostMapping("session")
//  public

  @PostMapping("signin")
  public UserInfo postLoginSignIn(@RequestBody UserLogin userLogin) {
    return loginService.checkLoginSignInCredentials(userLogin);
  }

  @PostMapping("signup")
  public UserInfo postLoginSignUp(@RequestBody UserLogin userLogin) {
    return loginService.checkRegistrationCredentials(userLogin);
  }

  @PostMapping("pswdchange")
  public String postLoginPasswordChange(@RequestBody UserLogin userLogin) {
    return usersService.checkPasswordChange(userLogin);
  }

  @GetMapping("test")
  public UserLogin showUserLoginFormat(){
    UserLogin userLogin = loginService.loginServiceTest();
    return userLogin;
  }

}
