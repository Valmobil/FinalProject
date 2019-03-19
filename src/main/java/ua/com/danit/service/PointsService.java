package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Point;
import ua.com.danit.repository.PointsRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class PointsService {
  private PointsRepository pointsRepository;

  @Autowired
  public PointsService(PointsRepository pointsRepository) {
    this.pointsRepository = pointsRepository;
  }

  public Point getPointById(Long pointId) {
    return pointsRepository.getOne(pointId);
  }

  public List<Point> getPointByName(String pointName) {
    //realization only for EN names
    List<Point> listOfPoints = new ArrayList<>();
    pointsRepository.findPointByPointNameEnLike(pointName + "%");
    return listOfPoints;
  }

}
