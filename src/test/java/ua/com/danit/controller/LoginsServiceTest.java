package ua.com.danit.controller;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.com.danit.model.UserInfo;
import ua.com.danit.model.UserLogin;
import ua.com.danit.repository.UsersRepository;
import ua.com.danit.service.LoginsService;
import ua.com.danit.service.UsersService;

import java.util.UUID;

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
  public void checkForNonExistingUserCredential() throws Exception {
    //Check not existing user
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin("+380680000000");
    userLogin.setUserPassword("12345");

    UserInfo userInfo = loginsService.checkLoginSignInCredentials(userLogin);
    assertThat(userInfo.getUser()).isNull();
    assertThat(userInfo.getCars()).size().isEqualTo(0);
    assertThat(userInfo.getUserPoints()).size().isEqualTo(0);
    assertThat(userInfo.getMessage().equals("Error: incorrect login or password!"));
  }

  @Test
  public void createNewUserAndCheckIt() throws Exception {
    //Check not existing user
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin("068-068-68-68");
    userLogin.setUserPassword("12345");
    UserInfo userInfo = loginsService.checkRegistrationCredentials(userLogin);

    assertThat(userInfo).isNotNull();
    assertThat(userInfo.getUser()).isNull();
    assertThat(userInfo.getMessage().equals("Error: Please repeat password correctly!"));


    userLogin.setUserPasswordNew("12345");
    userInfo = loginsService.checkRegistrationCredentials(userLogin);

    assertThat(userInfo.getUser()).isNotNull();
    assertThat(userInfo.getUser().getUserPhone().equals(usersService.normalizeMobilePhone(userLogin.getUserLogin())));
    assertThat(userInfo.getUser().getUserPassword().equals(usersService.passwordEncrypt(userLogin.getUserPassword())));
    assertThat(userInfo.getCars()).size().isEqualTo(0);
    assertThat(userInfo.getUserPoints()).size().isEqualTo(5);
  }

  @Test
  public void createNewUserByExternalTokenAndCheckIt() throws Exception {
    //Create new user
    UserLogin userLogin = new UserLogin();
    userLogin.setUserToken(UUID.randomUUID().toString());
    UserInfo userInfo = loginsService.checkRegistrationCredentials(userLogin);

    assertThat(userInfo).isNotNull();
    assertThat(userInfo.getUser()).isNull();
    assertThat(userInfo.getMessage().equals("Error: Please repeat password correctly!"));

    userLogin.setUserLogin("valeriy@gmail.com");
    userInfo = loginsService.checkRegistrationCredentials(userLogin);

    assertThat(userInfo.getUser()).isNotNull();
    assertThat(userInfo.getUser().getUserMail().equals(userLogin.getUserLogin()));
    assertThat(userInfo.getUser().getUserPassword()).isNull();
    assertThat(userInfo.getCars()).size().isEqualTo(0);
    assertThat(userInfo.getUserPoints()).size().isEqualTo(5);
  }
}
