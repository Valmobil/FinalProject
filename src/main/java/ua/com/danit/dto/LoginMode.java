package ua.com.danit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginMode {
  private String endPoint;
  private Boolean isEmail;
  private String mode;
}
