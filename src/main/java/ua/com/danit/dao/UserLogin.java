package ua.com.danit.dao;

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
  private String userPasswordNew;
}
