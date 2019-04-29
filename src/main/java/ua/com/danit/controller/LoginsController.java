package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.UserInfo;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.dto.UserResponce;
import ua.com.danit.service.LoginsService;
import ua.com.danit.service.MailSenderService;
import ua.com.danit.service.UsersService;

@RestController
@RequestMapping("api/logins")
public class LoginsController {
  private UsersService usersService;
  private LoginsService loginsService;
  private MailSenderService mailSenderService;

  @Autowired
  public LoginsController(UsersService usersService, LoginsService loginsService, MailSenderService mailSenderService) {
    this.usersService = usersService;
    this.loginsService = loginsService;
    this.mailSenderService = mailSenderService;
  }

  @PostMapping("signin")
  public RequestEntity<UserResponce> postLoginSignIn(@RequestBody UserLogin userLogin) {
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

  @PostMapping("email")
  public String checkUserByEmail(@RequestBody UserLogin userLogin, @RequestHeader(value = "Host") String host) {
    return mailSenderService.checkUserByEmail(userLogin, host);
  }
}
