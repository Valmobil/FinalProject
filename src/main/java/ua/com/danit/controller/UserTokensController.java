package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;
import ua.com.danit.service.UserTokensService;

@RestController
@RequestMapping("api/usertokens")
public class UserTokensController {
  private UserTokensService userTokensService;

  @Autowired
  public UserTokensController(UserTokensService userTokensService) {
    this.userTokensService = userTokensService;
  }

  @PostMapping("")
  public ResponseEntity requestNewToken(@RequestBody UserToken userToken) {
    return userTokensService.requestNewTokenService(userToken);
  }

  @GetMapping("test")
  public ResponseEntity testNewToken() {
    User user = new User();

    UserToken userToken = userTokensService.generateInitialTokinSet(user);
    if (userToken == null || userToken.getUserTokenRefresh() == null) {
      return new ResponseEntity<>("Error message!!!!!!!!!!!!!", HttpStatus.NOT_ACCEPTABLE);
    }
    return new ResponseEntity<>(userToken, HttpStatus.OK);
  }
}
