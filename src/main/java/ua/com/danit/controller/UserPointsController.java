package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.UserPointResponse;
import ua.com.danit.facade.UserPointFacade;
import ua.com.danit.service.UserPointsService;
import ua.com.danit.service.UserTokensService;

import java.util.List;

@RestController
@RequestMapping("api/userpoints")
public class UserPointsController {
  private UserPointFacade userPointFacade;
  private UserPointsService userPointsService;
  private UserTokensService userTokensService;

  @Autowired
  UserPointsController(UserPointsService userPointsService,
                       UserTokensService userTokensService,
                       UserPointFacade userPointFacade) {
    this.userPointsService = userPointsService;
    this.userTokensService = userTokensService;
    this.userPointFacade = userPointFacade;
  }

  @PutMapping()
  public ResponseEntity<String> saveUserPoints(@RequestBody List<UserPointResponse> pointResponses,
                                               @RequestHeader String authorization) {
    return new ResponseEntity<>(userPointFacade.saveUserPoints(pointResponses,
        userTokensService.findUserByAccessToken(authorization)), HttpStatus.OK);
  }
}
