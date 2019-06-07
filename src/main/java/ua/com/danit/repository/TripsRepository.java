package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;

import java.util.List;

public interface TripsRepository extends JpaRepository<Trip, Long> {

  /**
   * The Query get OwnTrip + Other Trips where points coincide with OwnTrip Points
   * Results are sorted starting from journeys with more matches
   **/
  @Query(value =
      "SELECT *, 5000 as COUNTS FROM TRIP"
          + " WHERE TRIP_ID = ?1"
          + " UNION"
          + " SELECT TRIP.*, COUNTS FROM TRIP "
          + " INNER JOIN "
          + " ("
          + " SELECT TRIP_ID as IDS, COUNT(TRIP_POINT.*) as COUNTS  FROM TRIP "
          + " INNER JOIN TRIP_POINT ON TRIP_POINT_TRIP_ID = TRIP_ID"
          + " WHERE CONCAT(CAST(TRIP_POINT_LATITUDE AS CHAR(10)) , '-', CAST(TRIP_POINT_LONGITUDE AS CHAR(10))) in "
          + "   ("
          + "   SELECT CONCAT(CAST(TRIP_POINT_LATITUDE AS CHAR(10)) , '-', CAST(TRIP_POINT_LONGITUDE AS CHAR(10))) "
          + "   FROM TRIP "
          + "   INNER JOIN TRIP_POINT ON TRIP_POINT_TRIP_ID = TRIP_ID"
          + "   WHERE TRIP_ID = ?1 and TRIP_IS_DELETED = 0"
          //+ "   AND TRIP_DATE_TIME >= (SELECT TRIP_DATE_TIME FROM TRIP WHERE TRIP_ID = ?1)"
          + "   )"
          + " GROUP BY TRIP_ID "
          + " ) TRIPS ON IDS = TRIP_ID"
          + " WHERE TRIP_USER_ID != ?2 and TRIP_IS_DELETED = 0 AND COUNTS > 1"
          + "AND  NVL(TRIP_USER_CAR_ID,-1) = NVL2(SELECT TRIP_USER_CAR_ID FROM TRIP WHERE TRIP_ID = ?1,-1,TRIP_USER_CAR_ID) "
          + " ORDER BY COUNTS DESC", nativeQuery = true)
  List<Trip> findOwnTripAndOtherTripsH2(Long tripId, Long userId);

  List<Trip> findByUserAndTripIsDeletedOrderByTripDateTimeDesc(User user, int isDeleted);

  @Query(value =
      "SELECT *, 5000 as COUNTS FROM TRIP"
          + " WHERE TRIP_ID = ?1"
          + " UNION"
          + " SELECT TRIP.*, COUNTS FROM TRIP "
          + " INNER JOIN "
          + " ("
          + " SELECT TRIP_ID as IDS, COUNT(TRIP_POINT.*) as COUNTS  FROM TRIP "
          + " INNER JOIN TRIP_POINT ON TRIP_POINT_TRIP_ID = TRIP_ID"
          + " WHERE CONCAT(CAST(TRIP_POINT_LATITUDE AS CHAR(10)) , '-', CAST(TRIP_POINT_LONGITUDE AS CHAR(10))) in "
          + "   ("
          + "   SELECT CONCAT(CAST(TRIP_POINT_LATITUDE AS CHAR(10)) , '-', CAST(TRIP_POINT_LONGITUDE AS CHAR(10))) "
          + "   FROM TRIP "
          + "   INNER JOIN TRIP_POINT ON TRIP_POINT_TRIP_ID = TRIP_ID"
          + "   WHERE TRIP_ID = ?1 and TRIP_IS_DELETED = 0"
          //+ "   AND TRIP_DATE_TIME >= (SELECT TRIP_DATE_TIME FROM TRIP WHERE TRIP_ID = ?1)"
          + "   )"
          + " GROUP BY TRIP_ID "
          + " ) TRIPS ON IDS = TRIP_ID"
          + " WHERE TRIP_USER_ID != ?2 and TRIP_IS_DELETED = 0 AND COUNTS > 1"
          + "    AND COALESCE(CAST(TRIP_USER_CAR_ID as varchar), 'null') = CASE WHEN (SELECT TRIP_USER_CAR_ID "
          + " FROM TRIP WHERE TRIP_ID = ?1) IS NULL"
          + "             THEN CAST(TRIP_USER_CAR_ID as varchar) ELSE 'null' END"
          + " ORDER BY COUNTS DESC", nativeQuery = true)
  List<Trip> findOwnTripAndOtherTripsPg(Long tripId, Long userId);

}
