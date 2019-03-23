package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@EqualsAndHashCode(exclude={"trip"})
//@ToString(exclude={"trip"})
public class TripPoint {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long tripPointId;
  private String tripPointName;
  private double tripPointLongitude;
  private double tripPointLatitude;
  private int tripPointSequence;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "TRIP_POINT_TRIP_ID", referencedColumnName = "tripId")
  @JsonIgnoreProperties({"user","car", "tripPoint", "tripDateTime"})
  private Trip trip;

}
