package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserToken {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long userTokenId;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_TOKEN_USER_ID", referencedColumnName = "userId")
  //  @JsonIgnoreProperties({"user", "userId", "userName", "userPhone",
  //      "userMail", "userTokenRefresh", "userTokenAccess", "userTokenAccessTo",
  //      "userPhoto", "car"})
  private User user;
  private String userTokenRefresh;
  private LocalDateTime userTokenRefreshTo;
  private String userTokenAccess;
  private LocalDateTime userTokenAccessTo;
}
