package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.UserTokenRequest;
import ua.com.danit.dto.UserTokenResponse;
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

  @PostMapping
  public ResponseEntity<UserTokenResponse> requestNewToken(@RequestBody UserTokenRequest userTokenRequest) {
    return new ResponseEntity<>(userTokensService.requestNewTokenService(userTokenRequest), HttpStatus.OK);
  }
}
