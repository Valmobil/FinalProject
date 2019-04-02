package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

  public UserToken requestNewTocken(UserToken userToken) {
    return userTokensService.requestNewTokenService(userToken);
  }

}
