package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.model.UserInfo;
import ua.com.danit.model.UserLogin;
import ua.com.danit.service.LoginsService;
import ua.com.danit.service.UsersService;

@RestController
@RequestMapping("api/logins")
public class LoginController {
  private UsersService usersService;
  private LoginsService loginsService;

  @Autowired
  public LoginController(UsersService usersService, LoginsService loginsService) {
    this.usersService = usersService;
    this.loginsService = loginsService;
  }

  //  @PostMapping("session")
  //  public

  @PostMapping("signin")
  public UserInfo postLoginSignIn(@RequestBody UserLogin userLogin) {
    return loginsService.checkLoginSignInCredentials(userLogin);
  }

  @PostMapping("signup")
  public UserInfo postLoginSignUp(@RequestBody UserLogin userLogin) {
    return loginsService.checkRegistrationCredentials(userLogin);
  }

  @PostMapping("pswdchange")
  public String postLoginPasswordChange(@RequestBody UserLogin userLogin) {
    return loginsService.checkPasswordChange(userLogin);
  }

  @PostMapping("pswdrestore")
  public String postLoginPasswordRestore(@RequestBody UserLogin userLogin) {
    return loginsService.checkPasswordRestore(userLogin);
  }


  @GetMapping("test")
  public UserLogin showUserLoginFormat() {
    return loginsService.loginServiceTest();
  }
}
