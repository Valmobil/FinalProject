package ua.com.danit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long feedbackId;
  @ManyToOne
  @JoinColumn(name = "FEEDBACK_DRIVER_TRIP_ID", referencedColumnName = "tripId")
  private Trip tripDriver;
  @ManyToOne
  @JoinColumn(name = "FEEDBACK_PASSENGER_TRIP_ID", referencedColumnName = "tripId")
  private Trip trippassenger;
  private int feedbackValue;
}
