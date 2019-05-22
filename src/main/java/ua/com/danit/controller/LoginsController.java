package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.service.LoginsService;
import ua.com.danit.service.MailSenderService;
import ua.com.danit.service.UserTokensService;

@RestController
@RequestMapping("api/logins")
public class LoginsController {
  private LoginsService loginsService;
  private MailSenderService mailSenderService;
  protected UserTokensService userTokensService;

  public LoginsController(LoginsService loginsService, MailSenderService mailSenderService,
                          UserTokensService userTokensService) {
    this.loginsService = loginsService;
    this.mailSenderService = mailSenderService;
    this.userTokensService = userTokensService;
  }

  @Autowired
  public LoginsController(LoginsService loginsService, MailSenderService mailSenderService) {
    this.loginsService = loginsService;
    this.mailSenderService = mailSenderService;
  }

  @PostMapping("signin")
  public ResponseEntity<UserResponse> postLoginSignIn(@RequestBody UserLogin userLogin) {
    return new ResponseEntity<>(loginsService.checkLoginSignInSignUp(userLogin, "SignIn"), HttpStatus.OK);
  }

  @PostMapping("signup")
  public ResponseEntity<UserResponse> postLoginSignUp(@RequestBody UserLogin userLogin) {
    return new ResponseEntity<>(loginsService.checkLoginSignInSignUp(userLogin, "SignUp"), HttpStatus.OK);
  }

  @PostMapping("pswdchange")
  public ResponseEntity<String> postLoginPasswordChange(@RequestBody UserLogin userLogin,
                                                        @RequestHeader String authorization) {
    return new ResponseEntity<>(loginsService.passwordChange(userLogin,
        userTokensService.findUserByAccessToken(authorization)), HttpStatus.OK);
  }

  @PostMapping("pswdrestore")
  public ResponseEntity<String> postLoginPasswordRestore(@RequestBody UserLogin userLogin) {
    return new ResponseEntity<>(loginsService.passwordRestore(userLogin), HttpStatus.OK);
  }

  @PostMapping("email")
  public ResponseEntity<String> checkUserByEmail(@RequestBody UserLogin userLogin,
                                                 @RequestHeader(value = "Host") String host) {
    return new ResponseEntity<>(mailSenderService.sendEmailWithMailConfirmation(userLogin, host, "email"), HttpStatus.OK);
  }

  @PostMapping("confirmemail")
  public ResponseEntity<String> checkConfirmEmail(@RequestBody UserLogin userLogin,
                                                  @RequestHeader(value = "Host") String host) {
    return new ResponseEntity<>(mailSenderService.sendEmailWithMailConfirmation(userLogin, host, "confirmemail"),
        HttpStatus.OK);
  }

  @GetMapping("confirmemailstatus")
  public ResponseEntity<String> confirmEmailStatus(@RequestParam(value = "token") String token) {
    return new ResponseEntity<>(loginsService.receiveMailConfirmation(token), HttpStatus.OK);
  }
}
