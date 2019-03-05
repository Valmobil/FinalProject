package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class Users {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long usersId;
  private String usersName;
  private String usersPhone;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String usersPassword;
  private String usersMail;
  @OneToMany(mappedBy = "user")
  private List<Cars> usersCars;
}
