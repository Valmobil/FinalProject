package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.lang.Nullable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@ToString
public class Trip extends Auditable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tripId;
  @ManyToOne
  @JoinColumn(name = "TRIP_USER_ID", referencedColumnName = "userId")
  private User user;
  @ManyToOne
  @JoinColumn(name = "TRIP_USER_CAR_ID", referencedColumnName = "userCarId")
  @JsonIgnoreProperties({"user"})
  @Nullable
  private UserCar userCar;
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "trip")
  private List<TripPoint> tripPoint;
  private LocalDateTime tripDateTime;
  private int tripSitsQty;
  private int tripIsDeleted;
}