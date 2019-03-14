package ua.com.danit.service;

import ua.com.danit.entity.Point;
import ua.com.danit.repository.PointsRepository;

public class PointsService {
  private PointsRepository pointsRepository;

  public PointsService(PointsRepository pointsRepository) {
    this.pointsRepository = pointsRepository;
  }

  public Point getPointById(Long pointId) {
    return pointsRepository.getOne(pointId);
  }

  public Point getPointByName(String pointName) {
    //TODO ...maybe with Locale?
    return null;
  }

}
