package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dao.userPoint.UserPointRequest;
import ua.com.danit.facade.UserPointsFacade;
import ua.com.danit.service.UserPointsService;
import ua.com.danit.service.UserTokensService;

import java.util.List;

@RestController
@RequestMapping("api/userpoints")
public class UserPointsController {
  private UserPointsFacade userPointsFacade;
  private UserPointsService userPointsService;
  private UserTokensService userTokensService;

  @Autowired
  UserPointsController(UserPointsService userPointsService,
                       UserTokensService userTokensService,
                       UserPointsFacade userPointsFacade) {
    this.userPointsService = userPointsService;
    this.userTokensService = userTokensService;
    this.userPointsFacade = userPointsFacade;
  }

  @PutMapping()
  public ResponseEntity<String> saveUserPoints(@RequestBody List<UserPointRequest> userPointRequests,
                                               @RequestHeader String authorization) {
    userPointsFacade.getAll()
    return new ResponseEntity<>(userPointsFacade.saveUserPoints(userPointRequests,
        userTokensService.findUserByAccessToken(authorization)), HttpStatus.OK);
  }
}
