package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.service.UserPointsService;

import java.util.List;

@RestController
@RequestMapping("api/userpoints")
public class UserPointsController {
  private UserPointsService userPointsService;

  @Autowired
  UserPointsController(UserPointsService userPointsService) {
    this.userPointsService = userPointsService;
  }

  @GetMapping("test")
  public List<UserPoint> getUserPointsById() {
    return userPointsService.getUserPointByUserId(1L);
  }

  @PutMapping()
  public String saveUserPoints(@RequestBody List<UserPoint> userPoints) {
    return userPointsService.saveUserPoints(userPoints);
  }

}
