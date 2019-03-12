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

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TripPoint {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long tripPointId;
  @JoinColumn(name = "trip_id")
  private Trip trip;
  private int tripPointSequence;
//  @JoinColumn(name = "point_id") tripPointPoint;
}
