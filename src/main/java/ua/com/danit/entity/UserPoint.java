package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class UserPoint {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userPointId;
  private String userPointName;
  private String userPointAddress;
  @ManyToOne
  @JoinColumn(name = "USER_POINT_USER_ID", referencedColumnName = "userId")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private User user;
  private double userPointLongitude;
  private double userPointLatitude;
}
