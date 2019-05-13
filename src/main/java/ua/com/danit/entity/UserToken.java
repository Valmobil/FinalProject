package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
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
@JsonIgnoreProperties({"user"})
public class UserToken {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userTokenId;
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "USER_TOKEN_USER_ID", referencedColumnName = "userId")
  private User user;
  private String userTokenRefresh;
  private LocalDateTime userTokenRefreshTo;
  private String userTokenAccess;
  private LocalDateTime userTokenAccessTo;
  @Column(length = 1500)
  private String userTokenExternal;
}
