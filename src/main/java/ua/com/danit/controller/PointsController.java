package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Point;
import ua.com.danit.model.PointSearch;
import ua.com.danit.service.PointsService;
import ua.com.danit.service.UserTokensService;

import java.util.ArrayList;
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

  @PostMapping("{point_id}")
  public Point getPointById(@PathVariable("point_id") Long pointId) {
    return pointsService.getPointById(pointId);
  }

  //returns first hardcoded Point in data.sql
  @GetMapping("test")
  public Point getPointById() {
    return pointsService.getPointById(1L);
  }

  @PostMapping("")
  public List<Point> searchByPointName(@RequestBody PointSearch pointsSerch, @RequestHeader String authorization) {
    if (userTokensService.findUserByAccessToken(authorization) != null) {
      return pointsService.getPointByName(pointsSerch);
    }
    return null;
  }
}
