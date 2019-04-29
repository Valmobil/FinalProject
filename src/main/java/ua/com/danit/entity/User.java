package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Builder
@Entity
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User extends Auditable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;
  private String userName;
  private String userPhone;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String userPassword;
  private String userMail;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String userPhoto;
  private Integer userIsOkUserPhoto;
  private Integer userIsOkCarPhoto;
  private Integer userIsConfirmedMail;
  private Integer userIsConfirmedPhone;
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
  private List<Car> cars;
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
  private List<UserPoint> userPoints;
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
  private List<UserToken> userTokens;
}
