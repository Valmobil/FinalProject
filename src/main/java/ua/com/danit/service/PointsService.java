package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Point;
import ua.com.danit.dao.PointSearch;
import ua.com.danit.repository.PointsRepository;

import java.util.List;

@Service
public class PointsService {
  private PointsRepository pointsRepository;

  @Autowired
  public PointsService(PointsRepository pointsRepository) {
    this.pointsRepository = pointsRepository;
  }

  public List<Point> getPointByName(PointSearch pointSearch) {
    String findPattern = "%" + pointSearch.getPointSearchText().toUpperCase() + "%";
    return pointsRepository.findMyTop10ByName(findPattern);
  }
}
