package ua.com.danit.controller;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.com.danit.model.UserLogin;
import ua.com.danit.service.LoginService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoginServiceTest {

  //  @Autowired
  //  private LoginController loginController;

  @Autowired
  private LoginService loginService;

  @Test
  public void checkForNonExistingUserCredential() throws Exception {
    //Check not existing user
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin("+380680686868");
    userLogin.setUserPassword("12345");
    assertThat(loginService.checkLoginSignInCredentials(userLogin).getUser()).isNull();
    assertThat(loginService.checkLoginSignInCredentials(userLogin).getCars()).size().isEqualTo(0);
    assertThat(loginService.checkLoginSignInCredentials(userLogin).getUserPoints()).size().isEqualTo(0);
    assertThat(loginService.checkLoginSignInCredentials(userLogin).getMessage().equals("Error: incorrect login or password!!!"));
  }

  @Test
  public void contexLoads() throws Exception {
    //Check not existing user
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin("+380680686868");
    userLogin.setUserPassword("12345");
    assertThat(loginService.checkLoginSignInCredentials(userLogin)).isNull();

    userLogin.setUserLogin("+380504434665");
  }

}
