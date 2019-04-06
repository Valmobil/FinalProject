package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import java.text.SimpleDateFormat;


@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class FeedbackInfo {
  //  @Column(name="USER_NAME")
  private String userName;
  //  @Column(name="TRIP_DATE_TIME")
  private SimpleDateFormat tripDateTime;
  //  private String type;
  //  @Column(name="NAME_FROM")
  //  private String nameFrom;
  //  @Column(name="NAME_TO")
  //  private String nameTo;
  //  @Column(name="FEEDBACK_DRIVER_TRIP_ID")
  //  private Long feedbackDriverTripId;
  //  @Column(name="FEEDBACK_PASSENGER_TRIP_ID")
  //  private Long feedbackPassengerTripId;
  //  @Column(name="FEEDBACK_USER_WHO_ID")
  //  private Long feedbackUserWhoId;
  //  @Column(name="FEEDBACK_USER_WHOM_ID")
  //  private Long feedbackUserWhomId;
  //  @Column(name="FEEDBACK_VALUE")
  //  private int feedbackValue;
  //  @Column(name="USER_PHOTO")
  //  private String userPhoto;
}
