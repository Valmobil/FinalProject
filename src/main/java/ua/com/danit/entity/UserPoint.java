package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

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
public class UserPoint {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userPointId;
  private String userPointName;
  private String userPointAddress;
  @ManyToOne
  @JoinColumn(name = "USER_POINT_USER_ID", referencedColumnName = "userId")
  //  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @NonNull
  @JsonIgnoreProperties({"userName", "userPhone", "userMail", "userToken", "userTokenValidTo", "userPhoto"})
  private User user;
  private double userPointLongitude;
  private double userPointLatitude;
  @ManyToOne
  @JoinColumn(name = "USER_POINT_POINT_ID", referencedColumnName = "pointId")
  private Point point;
}
