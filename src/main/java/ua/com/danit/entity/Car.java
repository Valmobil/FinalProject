package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;
import org.springframework.lang.Nullable;

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
@EqualsAndHashCode(callSuper = false)
@Builder
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Car extends Auditable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long carId;
  private String carName;
  private String carColour;
  private String carPhoto;
  @ManyToOne
  @NonNull
  @JoinColumn(name = "CAR_USER_ID", referencedColumnName = "userId")
  @JsonIgnoreProperties({"car", "user", "userId", "userName",
      "userPhone", "userMail", "userToken", "userTokenValidTo", "userPhoto"})
  private User user;
}

