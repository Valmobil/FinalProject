package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler","trip"})
public class TripPoint {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tripPointId;
  private String tripPointName;
  private double tripPointLongitude;
  private double tripPointLatitude;
  private int tripPointSequence;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "TRIP_POINT_TRIP_ID", referencedColumnName = "tripId")
  private Trip trip;

}
