package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripPassenger {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long tripPassengerId;
  @ManyToOne
  @JoinColumn(name = "TRIP_PASSENGER_DRIVER_TRIP_ID", referencedColumnName = "tripId")
  private Trip tripDriver;
  @ManyToOne
  @JoinColumn(name = "TRIP_PASSENGER_TRIP_ID", referencedColumnName = "tripId")
  private Trip tripPassenger;
}
