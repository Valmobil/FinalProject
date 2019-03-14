package ua.com.danit.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TripPoint {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long tripPointId;
  @ManyToOne
  @JoinColumn(name = "TRIP_POINT_TRIP_ID", referencedColumnName = "tripId")
  private Trip trip;
  private int tripPointSequence;
//  @JoinColumn(name = "point_id", referencedColumnName="tripId") tripPointPoint;
}
