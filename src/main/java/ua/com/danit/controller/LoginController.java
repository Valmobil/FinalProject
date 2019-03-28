package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.model.UserInfo;
import ua.com.danit.model.UserLogin;
import ua.com.danit.service.LoginsService;
import ua.com.danit.service.PswdResetTokenService;
import ua.com.danit.service.UsersService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/logins")
public class LoginController {
  private UsersService usersService;
  private LoginsService loginsService;
  private PswdResetTokenService pswdResetTokenService;

  @Autowired
  public LoginController(UsersService usersService, LoginsService loginsService, PswdResetTokenService pswdResetTokenService) {
    this.usersService = usersService;
    this.loginsService = loginsService;
    this.pswdResetTokenService = pswdResetTokenService;
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

  @PostMapping("email")
  public String checkUserByEmail(@RequestBody UserLogin userLogin, @RequestParam HttpServletRequest request) {
    //https://www.baeldung.com/spring-security-registration-i-forgot-my-password
    return pswdResetTokenService.checkUserByEmail(userLogin, request.getContextPath());
  }

    @GetMapping("test")
  public UserLogin showUserLoginFormat() {
    return loginsService.loginServiceTest();
  }
}
