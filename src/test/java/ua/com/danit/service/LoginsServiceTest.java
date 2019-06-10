package ua.com.danit.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.repository.UsersRepository;

import java.util.UUID;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoginsServiceTest {

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

    boolean isThrow = false;
    try {
      UserResponse userResponse = loginsService.checkLoginSignInSignUp(userLogin, "SignIn");
    } catch (ApplicationException e) {
      isThrow = true;
    }
    assertThat(isThrow);
  }

  @Test
  public void createNewUserAndCheckIt() {
    //Try to register user without repeated password
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin("068-068-68-68");
    userLogin.setUserPassword("12345");
    boolean isThrow = false;
    try {
      UserResponse userResponse = loginsService.checkLoginSignInSignUp(userLogin, "SignUp");
    } catch (ApplicationException e) {
      isThrow = true;
    }
    assertThat(isThrow);

    //Successful registration
    userLogin.setUserPasswordNew("12345");
    UserResponse userResponse = loginsService.checkLoginSignInSignUp(userLogin, "SignUp");

    assertThat(userResponse.getUserPhone().equals(usersService.normalizeAndCheckPhoneFormat(userLogin.getUserLogin())));
    assertThat(userResponse.getUserPoints()).size().isEqualTo(5);
  }

  @Test
  public void createNewUserByExternalTokenAndCheckIt() throws Exception {
    //Create new user using external token only - error expected
    UserLogin userLogin = new UserLogin();
    userLogin.setUserToken(UUID.randomUUID().toString());
    boolean isThrow = false;
    try {
      UserResponse userResponse = loginsService.checkLoginSignInSignUp(userLogin, "SignUp");
    } catch (ApplicationException e) {
      isThrow = true;
    }
    assertThat(isThrow);

    //Add login and expect new user successful registration
    userLogin.setUserLogin("val@gmail.com");
    UserResponse userResponse = loginsService.checkLoginSignInSignUp(userLogin, "SignUp");
    assertThat(userResponse.getUserMail().equals(userLogin.getUserLogin()));
    assertThat(userResponse.getUserPoints()).size().isEqualTo(5);
  }

}
