package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.repository.PointsRepository;
import ua.com.danit.entity.Point;

@Service
public class XmlFilePointSaveCashService {
  private PointsRepository pointsRepository;

  @Autowired
  public XmlFilePointSaveCashService(PointsRepository pointsRepository) {
    this.pointsRepository = pointsRepository;
  }

  public void savePointsToDb(Point pointNew) {
    //    this.points.add(pointNew);
    //    if (this.points.size() > stackQty) {
    Point point = pointsRepository.save(pointNew);
    //    }
  }
}
