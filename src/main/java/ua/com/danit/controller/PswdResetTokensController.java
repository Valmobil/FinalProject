package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.model.UserLogin;
import ua.com.danit.service.PswdResetTokenService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/user/reset")
public class PswdResetTokensController {
  private PswdResetTokenService pswdResetTokenService;

  @Autowired
  public PswdResetTokensController(PswdResetTokenService pswdResetTokenService) {
    this.pswdResetTokenService = pswdResetTokenService;
  }

  @PostMapping("email")
  public String checkUserByEmail(@RequestBody UserLogin userLogin, @RequestParam HttpServletRequest request) {
    //https://www.baeldung.com/spring-security-registration-i-forgot-my-password
    return pswdResetTokenService.checkUserByEmail(userLogin, request.getContextPath());
  }
}


