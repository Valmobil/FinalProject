package ua.com.danit.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.repository.UsersRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoginsServiceTest {

  //  @Autowired
  //  private LoginController loginController;

  @Autowired
  private LoginsService loginsService;
  @Autowired
  private UsersRepository usersRepository;
  @Autowired
  private UsersService usersService;

  @Test
  public void checkForNonExistingUserCredential() {
    //Check not existing user
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin("+380680000000");
    userLogin.setUserPassword("12345");

//    UserResponse userResponse = loginsService.checkLoginSignInCredentials(userLogin);
//    assertThat(userResponse.getisNull());
//    assertThat(userResponse.getUserCars()).size().isEqualTo(0);
//    assertThat(userResponse.getUserPoints()).size().isEqualTo(0);
//    assertThat(userResponse.getMessage().equals("Error: incorrect login or password!"));
  }

  @Test
  public void createNewUserAndCheckIt() {
    //Check not existing user
//    UserLogin userLogin = new UserLogin();
//    userLogin.setUserLogin("068-068-68-68");
//    userLogin.setUserPassword("12345");
//    UserInfo userInfo = loginsService.checkSignUpCredentials(userLogin);
//
//    assertThat(userInfo).isNotNull();
//    assertThat(userInfo.getUser()).isNull();
//    assertThat(userInfo.getMessage().equals("Error: Please repeat password correctly!"));
//
//
//    userLogin.setUserPasswordNew("12345");
//    userInfo = loginsService.checkSignUpCredentials(userLogin);
//
//    assertThat(userInfo.getUser()).isNotNull();
//    assertThat(userInfo.getUser().getUserPhone().equals(usersService.normalizeMobilePhone(userLogin.getUserLogin())));
//    assertThat(userInfo.getUser().getUserPassword().equals(usersService.passwordEncrypt(userLogin.getUserPassword())));
//    assertThat(userInfo.getUserCars()).size().isEqualTo(0);
//    assertThat(userInfo.getUserPoints()).size().isEqualTo(5);
  }

  @Test
  public void createNewUserByExternalTokenAndCheckIt() throws Exception {
    //Create new user using external token and login
//    UserLogin userLogin = new UserLogin();
//    userLogin.setUserToken(UUID.randomUUID().toString());
//    UserInfo userInfo = loginsService.checkSignUpCredentials(userLogin);
//
//    assertThat(userInfo).isNotNull();
//    assertThat(userInfo.getUser()).isNull();
//    assertThat(userInfo.getMessage().equals("Error: Please repeat password correctly!"));
//
//    userLogin.setUserLogin("val@gmail.com");
//    userInfo = loginsService.checkSignUpCredentials(userLogin);
//
//    assertThat(userInfo.getUser()).isNotNull();
//    assertThat(userInfo.getUser().getUserMail().equals(userLogin.getUserLogin()));
//    assertThat(userInfo.getUser().getUserPassword()).isNull();
//    assertThat(userInfo.getUserCars()).size().isEqualTo(0);
//    assertThat(userInfo.getUserPoints()).size().isEqualTo(5);
  }

  @Test
  public void createNewUserByLoginAndPasswordAndChekLoginByTokenAccess() throws Exception {
//    //Create new user (signUp) using login
//    UserLogin userLogin = new UserLogin();
//    userLogin.setUserPassword("98765");
//    userLogin.setUserPasswordNew("98765");
//    userLogin.setUserLogin("valeriy@gmail.com");
//    UserInfo userInfo = loginsService.checkSignUpCredentials(userLogin);
//
//    assertThat(userInfo.getUser()).isNotNull();
//    assertThat(userInfo.getUser().getUserMail().equals(userLogin.getUserLogin()));
//    assertThat(userInfo.getUser().getUserPassword()).isNotNull();
//    assertThat(userInfo.getUserCars()).size().isEqualTo(0);
//    assertThat(userInfo.getUserPoints()).size().isEqualTo(5);
//
//    //Login using Access token
//    userLogin = new UserLogin();
//    userLogin.setUserToken(userInfo.getUser().getUserTokenAccess());
//    UserInfo userInfoNext = loginsService.checkLoginSignInCredentials(userLogin);
//
//    assertThat(userInfoNext.getUser().getUserMail().equals(userInfo.getUser().getUserMail()));
//    assertThat(userInfoNext.getUser().getUserPassword().equals(userInfo.getUser().getUserPassword()));
  }
}
