package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.service.UserPointsService;
import ua.com.danit.service.UserTokensService;

import java.util.List;

@RestController
@RequestMapping("api/userpoints")
public class UserPointsController {
  private UserPointsService userPointsService;
  private UserTokensService userTokensService;

  @Autowired
  UserPointsController(UserPointsService userPointsService,
                       UserTokensService userTokensService) {
    this.userPointsService = userPointsService;
    this.userTokensService = userTokensService;
  }

  @PutMapping()
  public String saveUserPoints(@RequestBody List<UserPoint> userPoints, @RequestHeader String authorization) {
    return userPointsService.saveUserPoints(userPoints, userTokensService.findUserByAccessToken(authorization));
  }

}
