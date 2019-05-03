package ua.com.danit.dto;

import lombok.Data;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
public class UserTokenRequest {
  private String userTokenRefresh;
  private String userTokenAccess;
}
