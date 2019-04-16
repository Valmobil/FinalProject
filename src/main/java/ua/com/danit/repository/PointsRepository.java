package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.com.danit.entity.Point;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;

import java.util.List;

import java.util.List;

public interface PointsRepository extends JpaRepository<Point, Long> {

  List<Point> findPointByPointNameEnLike(String pointNameEn);

  @Query(value = "SELECT TOP 10 * FROM POINT "
      + " WHERE   "
      + " UCASE(POINT_NAME_UA) LIKE ?1"
      + " OR UCASE(POINT_NAME_EN) LIKE ?1"
      + " OR UCASE(POINT_NAME_RU) LIKE ?1", nativeQuery = true)
  List<Point> findMyTop10ByName(String searchPattern);

}
