package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Point;

import java.util.List;

public interface PointsRepository extends JpaRepository<Point, Long> {

  List<Point> findPointByPointNameEnLike(String pointNameEn);

}
