package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.lang.Nullable;
import ua.com.danit.controller.View;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.Null;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//@JsonIgnoreType()
@ToString
public class Trip extends Auditable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tripId;
  @JsonView(View.Summary.class)
  @ManyToOne
  @JoinColumn(name = "TRIP_USER_ID", referencedColumnName = "userId")
  @JsonIgnoreProperties({"userName", "userPhone", "userMail", "userToken", "userTokenValidTo", "userPhoto"})
  //  @JsonProperty("user")
  private User user;
  @ManyToOne
  @JoinColumn(name = "TRIP_CAR_ID", referencedColumnName = "carId")
  @JsonIgnoreProperties({"carName", "carColour", "carPhoto", "user"})
  @Nullable
  private Car car;
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "trip")
  private List<TripPoint> tripPoint;
  private LocalDateTime tripDateTime;
  private int tripSitsQty;
  private int tripIsDeleted;
}