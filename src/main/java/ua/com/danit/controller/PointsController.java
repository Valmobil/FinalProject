package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Point;
import ua.com.danit.dto.PointSearch;
import ua.com.danit.service.PointsService;
import ua.com.danit.service.UserTokensService;

import java.util.List;

@RestController
@RequestMapping("api/points")
public class PointsController {
  private PointsService pointsService;
  private UserTokensService userTokensService;

  @Autowired
  public PointsController(PointsService pointsService, UserTokensService userTokensService) {
    this.pointsService = pointsService;
    this.userTokensService = userTokensService;
  }

  @PostMapping
  public List<Point> searchByPointName(@RequestBody PointSearch pointsSerchMask, @RequestHeader String authorization) {
    if (userTokensService.findUserByAccessToken(authorization) != null) {
      return pointsService.getPointByName(pointsSerchMask);
    }
    return null;
  }
}
