package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ua.com.danit.controller.View;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;



@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Trip extends Auditable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long tripId;
  @JsonView(View.Summary.class)
  @ManyToOne
  @JoinColumn(name = "TRIP_USER_ID", referencedColumnName = "userId")
  private User user;
  @ManyToOne
  @JoinColumn(name = "TRIP_CAR_ID", referencedColumnName = "carId")
  private Car car;
  private LocalDateTime tripDateTime;
//  @ManyToOne
//  @JoinColumn(name = "TRIP_POINT_ID", referencedColumnName = "tripPointId")
//  private List<TripPoint> tripTripPoints;
  //  private List<User> tripUsers
}
