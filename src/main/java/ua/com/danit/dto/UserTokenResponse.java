package ua.com.danit.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.com.danit.entity.User;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
public class UserTokenResponse {
  private String userTokenRefresh;
  private LocalDateTime userTokenRefreshTo;
  private String userTokenAccess;
  private LocalDateTime userTokenAccessTo;
}
