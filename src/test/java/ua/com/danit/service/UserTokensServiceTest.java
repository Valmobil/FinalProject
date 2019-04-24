package ua.com.danit.service;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.com.danit.entity.UserToken;
import ua.com.danit.dao.UserInfo;
import ua.com.danit.dao.UserLogin;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTokensServiceTest {


  @Autowired
  UserTokensService userTokensService;
  @Autowired
  LoginsService loginsService;

  @Test
  public void checkExistingTokingAnswer() {
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin("gmail@mail.ru");
    userLogin.setUserPassword("1234567890");
    userLogin.setUserPasswordNew("1234567890");
    UserInfo userInfo = loginsService.checkRegistrationCredentials(userLogin);

    UserToken userToken = new UserToken();
    userToken.setUserTokenRefresh(userInfo.getUser().getUserTokenRefresh());

    for (int i = 0; i < 10; i++) {
      UserToken userTokenNext = (UserToken) userTokensService.requestNewTokenService(userToken).getBody();
      //Check result
      Assert.assertNotEquals(userToken.getUserTokenRefresh(),userTokenNext.getUserTokenRefresh());
      Assert.assertNotEquals(userToken.getUserTokenAccess(),userTokenNext.getUserTokenAccess());
      Assert.assertNotNull(userTokenNext);
      Assert.assertNotNull(userTokenNext.getUserTokenRefresh());

      userToken = userTokenNext;
    }
    System.out.println();
  }


}