package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
public class Trip extends Auditable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long tripId;
  @ManyToOne
  @JoinColumn(name = "TRIP_USER_ID", referencedColumnName = "userId")
  private User user;
  @ManyToOne
  @JoinColumn(name = "TRIP_CAR_ID", referencedColumnName = "carId")
  //  @Column(name = "trip_car_id")
  private Car car;
  private LocalDateTime tripDateTime;
  //  private List<TripPoint> tripTripPoints;
  //  private List<User> tripUsers
}
