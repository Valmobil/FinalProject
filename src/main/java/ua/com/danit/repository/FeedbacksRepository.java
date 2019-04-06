package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;
import ua.com.danit.entity.Feedback;
import ua.com.danit.entity.User;
import ua.com.danit.model.FeedbackInfo;


import java.util.List;

public interface FeedbacksRepository {
  //public interface FeedbacksRepository extends JpaRepository<FeedbackInfo, Long> {

  //    List<Feedback> findBy(User user);

  //@Query(value = "SELECT " +
  //"   user_Name, dp.trip_date_time, 'Passenger' as Type, dt.trip_id as feedback_driver_trip_id, dp.trip_id " +
  //"   as feedback_passenger_trip_id, dt.trip_user_id as feedback_user_who_id, dp.trip_user_id as feedback_user_whom_id" +
  //"   ,u.user_photo, tp_first.trip_point_name as name_from, tp_last.trip_point_name as name_to,'' as feedback_value" +
  //" FROM  trip_passenger" +
  //" INNER JOIN trip dt on dt.trip_id = trip_passenger_driver_trip_id" +
  //" INNER JOIN trip dp on dp.trip_id = trip_passenger_trip_id" +
  //" INNER JOIN user u on u.user_id = dp.trip_user_id" +
  //" INNER JOIN trip_point tp_first on tp_first.trip_point_trip_id = dp.trip_id" +
  //" INNER JOIN (SELECT min(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by " +
  //"   trip_point_trip_id) tp_filter on tp_filter.trip_point_sequence = tp_first.trip_point_sequence " +
  //"   and tp_filter.trip_point_trip_id = tp_first.trip_point_trip_id" +
  //" INNER JOIN trip_point tp_last on tp_last.trip_point_trip_id = dp.trip_id" +
  //" INNER JOIN (SELECT max(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by " +
  //"   trip_point_trip_id) tp_filter_last on tp_filter_last.trip_point_sequence = tp_last.trip_point_sequence and " +
  //"   tp_filter_last.trip_point_trip_id = tp_last.trip_point_trip_id" +
  //" WHERE  concat(CAST(dt.trip_id as varchar(19)),'_',CAST( dp.trip_id as varchar(19))) not in (" +
  //"   SELECT  concat(cast(feedback_driver_trip_id  as varchar(19)),'_',cast( feedback_passenger_trip_id  " +
  //"   as varchar(19))) from feedback where feedback_value <> 0)"
  //, nativeQuery = true, resultSetMapping = "EmployeeResult"))
  //List<FeedbackInfo> getSqlData();

  //  List<FeedbackInfo> findAllFeedbacksWithDetails();

  //@Query(nativeQuery = true, name = "findAllDataMapping")
  //List<FeedbackInfo> getSqlData();
  //List<FeedbackInfo> results = this.em.createNativeQuery("" +
  //"SELECT " +
  //"   user_Name, dp.trip_date_time" +
  //" FROM  trip_passenger" +
  //" INNER JOIN trip dt on dt.trip_id = trip_passenger_driver_trip_id" +
  //" INNER JOIN trip dp on dp.trip_id = trip_passenger_trip_id" +
  //" INNER JOIN user u on u.user_id = dp.trip_user_id" +
  //" INNER JOIN trip_point tp_first on tp_first.trip_point_trip_id = dp.trip_id" +
  //" INNER JOIN (SELECT min(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by " +
  //"   trip_point_trip_id) tp_filter on tp_filter.trip_point_sequence = tp_first.trip_point_sequence " +
  //"   and tp_filter.trip_point_trip_id = tp_first.trip_point_trip_id" +
  //" INNER JOIN trip_point tp_last on tp_last.trip_point_trip_id = dp.trip_id" +
  //" INNER JOIN (SELECT max(trip_point_sequence) trip_point_sequence, trip_point_trip_id from trip_point group by " +
  //"   trip_point_trip_id) tp_filter_last on tp_filter_last.trip_point_sequence = tp_last.trip_point_sequence and " +
  //"   tp_filter_last.trip_point_trip_id = tp_last.trip_point_trip_id" +
  //" WHERE  concat(CAST(dt.trip_id as varchar(19)),'_',CAST( dp.trip_id as varchar(19))) not in (" +
  //"   SELECT  concat(cast(feedback_driver_trip_id  as varchar(19)),'_',cast( feedback_passenger_trip_id  " +
  //"   as varchar(19))) from feedback where feedback_value <> 0)" +
  //"", FeedbackInfo.class).getResultList();
}
