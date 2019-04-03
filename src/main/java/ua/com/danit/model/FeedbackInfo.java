package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class FeedbackInfo {
  private String userName;
  private SimpleDateFormat tripDateTime;
  private String type;
  private String nameFrom;
  private String nameTo;
  private Long feedbackDriverTripId;
  private Long feedbackPassengerTripId;
  private Long feedbackUserWhoId;
  private Long feedbackUserWhomId;
  private int feedbackValue;
}
//public class FeedbackInfo {
//  private String user_Name;
//  private SimpleDateFormat trip_Date_Time;
//  private String type;
//  private String nameFrom;
//  private String nameTo;
//  private Long feedback_Driver_Trip_Id;
//  private Long feedback_Passenger_Trip_Id;
//  private Long feedback_User_Who_Id;
//  private Long feedback_User_Whom_Id;
//  private int feedback_Value;
//}
