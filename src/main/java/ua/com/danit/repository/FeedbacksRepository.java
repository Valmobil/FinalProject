package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.com.danit.entity.Feedback;
import ua.com.danit.dto.FeedbackInfo;


import java.util.List;


public interface FeedbacksRepository extends JpaRepository<Feedback, Long> {
  //public interface FeedbacksRepository extends JpaRepository<FeedbackInfo, Long> {

  //    List<Feedback> findBy(User user);


  @Query(value = "SELECT "
      + "   user_Name userName, dt.trip_date_time tripDateTime, 'Passenger' as userType, dp.trip_id as feedbackTripIdWho"
      + "   , dt.trip_id as feedbackTripIdWhom, u.user_photo userPhoto, tp_first.trip_point_name as tripPointNameFrom"
      + "   , tp_last.trip_point_name as tripPointNameTo, 0 as feedbackValue FROM  trip_passenger"
      + " INNER JOIN trip dt on dt.trip_id = trip_passenger_driver_trip_id"
      + " INNER JOIN trip dp on dp.trip_id = trip_passenger_trip_id"
      + " INNER JOIN user u on u.user_id = dp.trip_user_id"
      + " INNER JOIN trip_point tp_first on tp_first.trip_point_trip_id = dp.trip_id"
      + " INNER JOIN (SELECT min(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by "
      + "   trip_point_trip_id) tp_filter on tp_filter.trip_point_sequence = tp_first.trip_point_sequence "
      + "   and tp_filter.trip_point_trip_id = tp_first.trip_point_trip_id"
      + " INNER JOIN trip_point tp_last on tp_last.trip_point_trip_id = dp.trip_id"
      + " INNER JOIN (SELECT max(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by "
      + "   trip_point_trip_id) tp_filter_last on tp_filter_last.trip_point_sequence = tp_last.trip_point_sequence and "
      + "   tp_filter_last.trip_point_trip_id = tp_last.trip_point_trip_id"
      + " WHERE  concat(CAST(dp.trip_id as varchar(19)),'_',CAST( dt.trip_id as varchar(19))) not in ("
      + "   SELECT  concat(cast(feedback_trip_id_who  as varchar(19)),'_',cast( feedback_trip_id_whom  "
      + "   as varchar(19))) from feedback where feedback_value <> 0)"
      + " union"
      + " SELECT "
      + "   user_Name userName, dp.trip_date_time tripDateTime, 'Driver' as userType, dt.trip_id as feedbackTripIdWho"
      + "   , dp.trip_id as feedbackTripIdWhom, user_photo userPhoto, tp_first.trip_point_name as tripPointNameFrom"
      + "   , tp_last.trip_point_name as tripPointNameTo,0 as feedbackValue"
      + " FROM  trip_passenger"
      + " INNER JOIN trip dt on dt.trip_id = trip_passenger_driver_trip_id"
      + " INNER JOIN user up on up.user_id = dt.trip_user_id"
      + " INNER JOIN trip dp on dp.trip_id = trip_passenger_trip_id"
      + " INNER JOIN trip_point tp_first on tp_first.trip_point_trip_id = dt.trip_id"
      + " INNER JOIN (SELECT min(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by "
      + "   trip_point_trip_id) tp_filter on tp_filter.trip_point_sequence = tp_first.trip_point_sequence "
      + "   and tp_filter.trip_point_trip_id = tp_first.trip_point_trip_id"
      + " INNER JOIN trip_point tp_last on tp_last.trip_point_trip_id = dt.trip_id"
      + " INNER JOIN (SELECT max(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by "
      + "   trip_point_trip_id) tp_filter_last on tp_filter_last.trip_point_sequence = tp_last.trip_point_sequence and "
      + "   tp_filter_last.trip_point_trip_id = tp_last.trip_point_trip_id"
      + " WHERE  concat(CAST(dt.trip_id as varchar(19)),'_',CAST( dp.trip_id as varchar(19))) not in ("
      + "   SELECT  concat(cast(feedback_trip_id_who  as varchar(19)),'_',cast( feedback_trip_id_whom  "
      + "   as varchar(19))) from feedback where feedback_value <> 0)",
      nativeQuery = true)
  List<FeedbackInfo> getSqlData();

}
