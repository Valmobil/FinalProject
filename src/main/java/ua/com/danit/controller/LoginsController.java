package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.service.LoginsService;
import ua.com.danit.service.MailSenderService;

@RestController
@RequestMapping("api/logins")
public class LoginsController {
  private LoginsService loginsService;
  private MailSenderService mailSenderService;

  @Autowired
  public LoginsController(LoginsService loginsService, MailSenderService mailSenderService) {
    this.loginsService = loginsService;
    this.mailSenderService = mailSenderService;
  }

  @PostMapping("signin")
  public ResponseEntity<UserResponse> postLoginSignIn(@RequestBody UserLogin userLogin) {
    return new ResponseEntity<>(loginsService.checkLoginSignInCredentials(userLogin), HttpStatus.OK);
  }

  @PostMapping("signup")
  public ResponseEntity<UserResponse> postLoginSignUp(@RequestBody UserLogin userLogin) {
    return new ResponseEntity<>(loginsService.checkSignUpCredentials(userLogin),HttpStatus.OK);
  }

  @PostMapping("pswdchange")
  public ResponseEntity<String> postLoginPasswordChange(@RequestBody UserLogin userLogin) {
    return new ResponseEntity<>(loginsService.checkPasswordChange(userLogin),HttpStatus.OK);
  }

  @PostMapping("pswdrestore")
  public ResponseEntity<String> postLoginPasswordRestore(@RequestBody UserLogin userLogin) {
    return new ResponseEntity<>(loginsService.checkPasswordRestore(userLogin),HttpStatus.OK);
  }

  @PostMapping("email")
  public ResponseEntity<String> checkUserByEmail(@RequestBody UserLogin userLogin,
                                                 @RequestHeader(value = "Host") String host) {
    return new ResponseEntity<>(mailSenderService.checkUserByEmail(userLogin, host),HttpStatus.OK);
  }
}
