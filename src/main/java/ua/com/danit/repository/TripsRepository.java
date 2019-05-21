package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;

import java.util.List;

public interface TripsRepository extends JpaRepository<Trip, Long> {

  List<Trip> findByUser(User user);


  //The Query get OwnTree + Other Trips where points coincide with OwnTrip Points
  //Results are sorted from journeys with more matches
  @Query(value =
      "SELECT *, 5000 as COUNTS FROM TRIP"
          + " INNER JOIN TRIP_POINT ON TRIP_POINT_ID = TRIP_ID "
          + " WHERE TRIP_ID = ?1"
          + " UNION"
          + " SELECT TRIP.*, TRIP_POINT.*, COUNTS FROM TRIP "
          + " INNER JOIN TRIP_POINT ON TRIP_POINT_ID = TRIP_ID "
          + " INNER JOIN ("
          + " SELECT TRIP_ID as IDS, COUNT(*) as COUNTS  FROM TRIP "
          + " INNER JOIN TRIP_POINT ON TRIP_POINT_ID = TRIP_ID "
          + " WHERE CONCAT(CAST(TRIP_POINT_LATITUDE AS CHAR(10)) , '-', CAST(TRIP_POINT_LONGITUDE AS CHAR(10))) in ("
          + "  SELECT CONCAT(CAST(TRIP_POINT_LATITUDE AS CHAR(10)) , '-', CAST(TRIP_POINT_LONGITUDE AS CHAR(10))) FROM TRIP "
          + "  INNER JOIN TRIP_POINT ON TRIP_POINT_ID = TRIP_ID"
          + "  WHERE TRIP_POINT_ID = ?1"
          + " ) "
          + " GROUP BY TRIP_ID"
          + " ) TRIPS ON IDS = TRIP_ID"
          + " WHERE TRIP_POINT_ID != ?1"
          + " ORDER BY COUNTS DESC", nativeQuery = true)
  List<Trip> findOwnTripAndOtherTrips(Long tripId);

}
