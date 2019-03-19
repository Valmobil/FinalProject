package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Point;
import ua.com.danit.service.PointsService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/points")
public class PointsController {
  private PointsService pointsService;

  @Autowired
  public PointsController(PointsService pointsService) {
    this.pointsService = pointsService;
  }

  @PostMapping("{point_id}")
  public Point getPointById(@PathVariable("point_id") Long pointId) {
    return pointsService.getPointById(pointId);
  }

  @PostMapping("filter/{point_name_en}")
  public List<Point> getPointByName(@PathVariable("point_name_en") String pointName) {
    return pointsService.getPointByName(pointName);
  }

  //returns first hardcoded Point in data.sql
  @GetMapping("test")
  public Point getPointById() {
    return pointsService.getPointById(1L);
  }

  //returns all hardcoded Points in data.sql
  @GetMapping("filter/test")
  public List<Point> getPointByName() {
    List<Point> points = new ArrayList<>();
    for (long i = 1; i < 9; i++) {
      points.add(pointsService.getPointById(i));
    }
    return points;
  }
}
