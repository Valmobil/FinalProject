package ua.com.danit.entity;

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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_pswd_reset")
public class PswdResetToken {
  private static final int EXPIRATION = 24;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String token;
  @ManyToOne
  @JoinColumn(referencedColumnName = "userId")
  private User user;
  private LocalDateTime expiryDate;

  public PswdResetToken(String token, User user) {
    this.token = token;
    this.user = user;
    this.expiryDate = LocalDateTime.now().plusHours(EXPIRATION);
  }
}
