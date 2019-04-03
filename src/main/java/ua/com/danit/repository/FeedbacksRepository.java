package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Feedback;

import java.util.List;

public interface FeedbacksRepository extends JpaRepository<Feedback, Long> {

  //  List<Feedback> findByUserWho(User user);
  //  @Query(value = "SELECT " +
  //      " user_Name, dp.trip_date_time, 'Passenger' as Type, dt.trip_id as FEEDBACK_DRIVER_TRIP_ID," +
  //      " dp.trip_id as FEEDBACK_PASSENGER_TRIP_ID, dt.trip_user_id as FEEDBACK_USER_WHO_ID," +
  //      " dp.trip_user_id as FEEDBACK_USER_WHOM_ID, tp_first.trip_point_name as namefrom, tp_last.trip_point_name as
  //      nameto," +
  //      " '' as FEEDBACK_VALUE" +
  //      " FROM  trip_passenger" +
  //      " INNER JOIN trip dt on dt.trip_id = trip_passenger_driver_trip_id" +
  //      " INNER JOIN trip dp on dp.trip_id = trip_passenger_trip_id" +
  //      " INNER JOIN user up on up.user_id = dp.trip_user_id" +
  //      " INNER JOIN trip_point tp_first on tp_first.trip_point_trip_id = dp.trip_id" +
  //      " INNER JOIN (SELECT min(trip_point_sequence) trip_point_sequence, trip_point_trip_id FROM TRIP_POINT group by
  //      TRIP_POINT_TRIP_ID) tp_filter " +
  //      " on tp_filter.trip_point_sequence = tp_first.trip_point_sequence and tp_filter.trip_point_trip_id = tp_first.
  //      trip_point_trip_id" +
  //      " INNER JOIN trip_point tp_last on tp_last.trip_point_trip_id = dp.trip_id" +
  //      " INNER JOIN (SELECT max(trip_point_sequence) trip_point_sequence, trip_point_trip_id FROM TRIP_POINT group by
  //      TRIP_POINT_TRIP_ID) tp_filter_last " +
  //      " on tp_filter_last.trip_point_sequence = tp_last.trip_point_sequence and tp_filter_last.trip_point_trip_id =
  //      tp_last.trip_point_trip_id" +
  //      " WHERE  concat(CAST(dt.trip_id as varchar(19)),'_',CAST( dp.trip_id as varchar(19))) not in (" +
  //      " SELECT  concat(CAST(FEEDBACK_DRIVER_TRIP_ID  as varchar(19)),'_',CAST( FEEDBACK_PASSENGER_TRIP_ID  as
  //      varchar(19))) from FEEDBACK where FEEDBACK_VALUE <> 0)", nativeQuery = true)
  //  List<FeedbackInfo> getSqlData();
  List<Feedback> findAll();
}
