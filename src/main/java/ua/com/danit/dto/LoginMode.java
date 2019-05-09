package ua.com.danit.dto;

import lombok.Data;

@Data
public class LoginMode {
  private String endPoint;
  private Boolean isEmail;
  private String mode;
}
