package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLogin {
  private String userLogin;
  private String userPassword;
  private String userToken;
}
