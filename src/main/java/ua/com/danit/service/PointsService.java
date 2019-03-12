package ua.com.danit.service;

import ua.com.danit.entity.Point;
import ua.com.danit.repository.PointsRepository;

public class PointsService {
  private PointsRepository pointsRepository;

  public PointsService(PointsRepository pointsRepository) {
    this.pointsRepository = pointsRepository;
  }

  public Point getPointById(Long point_id) {
    return pointsRepository.getOne(point_id);
  }

  public Point getPointByName(String pointName) {
    //TODO ...maybe with Locale?
    return null;
  }

}
