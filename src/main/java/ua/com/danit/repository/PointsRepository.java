package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Point;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;

import java.util.List;

import java.util.List;

public interface PointsRepository extends JpaRepository<Point, Long> {

  List<Point> findPointByPointNameEnLike(String pointNameEn);

  List<Point> findTop10ByPointNameEnContaining(String searchPatern);

}
