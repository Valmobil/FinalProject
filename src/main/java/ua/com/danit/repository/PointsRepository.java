package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.com.danit.entity.Point;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;

import java.util.List;

import java.util.List;

public interface PointsRepository extends JpaRepository<Point, Long> {

  @Query(value = "SELECT TOP 10 POINT.* FROM POINT "
      + " INNER JOIN "
      + " (SELECT ROW_NUMBER() OVER (PARTITION BY POINT_NAME_EN ORDER BY POINT_NAME_EN) AS Rank,"
      + " POINT_ID,  POINT_NAME_EN FROM POINT ) f"
      + " ON (f.POINT_ID = POINT.POINT_ID"
      + " AND f.Rank = 1)"
      + " WHERE   "
      + " UCASE(POINT.POINT_NAME_UA) LIKE %?1%"
      + " OR UCASE(POINT.POINT_NAME_EN) LIKE %?1%"
      + " OR UCASE(POINT.POINT_NAME_RU) LIKE %?1%", nativeQuery = true)
  List<Point> findMyTop10ByNameH2(String searchPattern);

  @Query(value = "SELECT POINT.* FROM POINT "
      + " INNER JOIN "
      + " (SELECT ROW_NUMBER() OVER (PARTITION BY POINT_NAME_EN ORDER BY POINT_NAME_EN) AS Rank,"
      + " POINT_ID,  POINT_NAME_EN FROM POINT ) f"
      + " ON (f.POINT_ID = POINT.POINT_ID"
      + " AND f.Rank = 1)"
      + " WHERE   "
      + " UPPER(POINT.POINT_NAME_UA) LIKE %?1%"
      + " OR UPPER(POINT.POINT_NAME_EN) LIKE %?1%"
      + " OR UPPER(POINT.POINT_NAME_RU) LIKE %?1%"
      + " LIMIT 10", nativeQuery = true)
  List<Point> findMyTop10ByNamePg(String searchPattern);
}
