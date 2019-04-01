package ua.com.danit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserToken {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long userTokenId;
  @ManyToOne
  @JoinColumn(name = "USER_TOKEN_USER_ID", referencedColumnName = "userId")
  private User user;
  private String userTokenRead;
  private Date userTokenReadTo;
  private String userTokenAccess;
  private Date userTokenAccessTo;
}
