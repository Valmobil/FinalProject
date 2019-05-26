package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import javax.persistence.ManyToOne;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserCar extends Auditable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long userCarId;
  private String userCarName;
  private String userCarColour;
  private String userCarPhoto;
  @ManyToOne
  @JoinColumn(name = "USER_CAR_USER_ID", referencedColumnName = "userId")
  private User user;

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (!(obj instanceof UserCar)) {
      return false;
    }
    UserCar userCar = (UserCar) obj;
    return userCarId == userCar.userCarId;
  }

  @Override
  public int hashCode() {
    return Objects.hash(super.hashCode(), userCarId);
  }
}

