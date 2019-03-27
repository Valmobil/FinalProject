package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.model.UserInfo;
import ua.com.danit.model.UserLogin;
import ua.com.danit.repository.UsersRepository;

import static ua.com.danit.service.UsersService.checkEmailFormat;
import static ua.com.danit.service.UsersService.normalizeMobilePhone;

@Service
public class LoginsService {
  private UsersRepository usersRepository;
  private UsersService usersService;

  @Autowired
  public LoginsService(UsersRepository usersRepository,
                       UsersService usersService) {
    this.usersRepository = usersRepository;
    this.usersService = usersService;
  }

  public UserLogin loginServiceTest() {
    User user = usersRepository.getOne(1L);
    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin(user.getUserPhone());
    userLogin.setUserPassword(user.getUserPassword());
    userLogin.setUserPasswordNew("54321");
    userLogin.setUserToken(user.getUserToken());
    return userLogin;
  }

  public String checkPasswordRestore(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    UserInfo userInfo = new UserInfo();
    if (userLogin.getUserToken() == null) {
      //L=0 T=0 P=0 NP=0
      return "Error! Please fill restore token!!!";
    } else {
      //L=0 T=1 P=0 NP=0
      //find user by Session Token in DB
      userInfo.setUser(usersService.checkIfSessionTokenIsPresent(userLogin));
      if (userInfo.getUser() == null) {
        return "Error: Incorrect or expired Token!!!";
      }
      //Generate new token
      usersService.generateNewSessionToken(userInfo.getUser());
      usersRepository.save(userInfo.getUser());
    }
    return "Ok. Password was changed! Please login using new password!";
  }

  public String checkPasswordChange(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    UserInfo userInfo = new UserInfo();
    if (userLogin.getUserLogin() == null) {
      //L=0 T=0 P=0 NP=0
      return "Error! Have no user login!!!";
    } else {
      if (userLogin.getUserPassword() == null) {
        //L=1 T=0 P=0 NP=0
        return "Error: incorrect old password!!!";
      } else {
        //L=1 T=0 P=1 NP=0
        userInfo.setUser(usersService.checkIfLoginAndPasswordIsCorrect(userLogin));
        if (userInfo.getUser() == null) {
          return "Error: incorrect login or password!!!";
        }
        //Save new password
        userInfo.getUser().setUserPassword(userLogin.getUserPasswordNew());
        usersRepository.save(userInfo.getUser());
      }
      return "Ok, Password was changed successfully!";
    }
  }

  public UserInfo checkRegistrationCredentials(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    UserInfo userInfo = new UserInfo();
    if (userLogin.getUserLogin() == null) {
      if (userLogin.getUserToken() == null) {
        //L=0 T=0 P=0 NP=0
        userInfo.setMessage("Error! Please fill user login with phone or e-Mail or use Google/Facebook authorization !!!");
        return userInfo;
      } else {
        //L=0 T=1 P=0 NP=0
        //find user by Session Token in DB
        userInfo.setUser(usersService.checkIfSessionTokenIsPresent(userLogin));
        if (userInfo.getUser() == null) {
          userInfo.setMessage("Error: have no e-Mail for your external token!!!");
        }
      }
    } else {
      if (userLogin.getUserToken() == null) {
        if (userLogin.getUserPassword() == null) {
          //L=1 T=0 P=0 NP=0
          userInfo.setMessage("Error: incorrect password!!!");
          return userInfo;
        } else {
          if (userLogin.getUserPasswordNew() == null
              || !userLogin.getUserPassword().equals(userLogin.getUserPasswordNew())) {
            //L=1 T=0 P=1 NP=0
            userInfo.setMessage("Error: Please repeat password correctly!!!");
            return userInfo;
          } else {
            //L=1 T=0 P=1 NP=1
            userInfo.setUser(usersService.checkLogin(userLogin));
            if (userInfo.getUser() == null) {
              //Add new user with new credentials
              userInfo.setUser(new User());

              saveLoginToMailOrPhone(userInfo, userLogin);
              userInfo.getUser().setUserPassword(usersService.passwordEncrypt(userLogin.getUserPassword()));
              usersService.generateNewSessionToken(userInfo.getUser());
              userInfo.setUser(usersRepository.save(userInfo.getUser()));
              userInfo.setMessage("Ok! User was created!");
            } else {
              userInfo = new UserInfo();
              userInfo.setMessage("Error: The user with this login was already registered!!!");
            }
          }
        }
      } else {
        //L=1 T=1 P=0 NP=0
        //Update Token if token and login are present
        usersService.checkLoginAndUpdateTokenInDb(userInfo, userLogin);
      }
    }
    usersService.addCarsAndUserPoints(userInfo);
    return userInfo;
  }

  void saveLoginToMailOrPhone(UserInfo userInfo, UserLogin userLogin) {
    if (usersService.checkForEmail(userLogin)) {
      // if login is mail
      //check if e-Mail has correct format
      if (!checkEmailFormat(userLogin.getUserLogin())) {
        userInfo.setMessage("Error: e-Mail address format is not correct!!!");
        return;
      }
      userInfo.getUser().setUserMail(userLogin.getUserLogin());
    } else {
      //if login is phone
      userInfo.getUser().setUserPhone(normalizeMobilePhone(userLogin.getUserLogin()));
    }
  }

  public UserInfo checkLoginSignInCredentials(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    UserInfo userInfo = new UserInfo();
    if (userLogin.getUserLogin() == null) {
      if (userLogin.getUserToken() == null) {
        //L=0 T=0 P=0 NP=0
        userInfo.setMessage("Error! Have no user with such login!!!");
        return userInfo;
      } else {
        //L=0 T=1 P=0 NP=0
        //find user by Session Token in DB
        userInfo.setUser(usersService.checkIfSessionTokenIsPresent(userLogin));
        if (userInfo.getUser() == null) {
          userInfo.setMessage("Error: have no valid session token!!!");
        }
      }
    } else {
      if (userLogin.getUserToken() == null) {
        if (userLogin.getUserPassword() == null) {
          //L=1 T=0 P=0 NP=0
          userInfo.setMessage("Error: incorrect login or password!!!");
          return userInfo;
        } else {
          //L=1 T=0 P=1 NP=0
          userInfo.setUser(usersService.checkIfLoginAndPasswordIsCorrect(userLogin));
          if (userInfo.getUser() == null) {
            userInfo.setMessage("Error: incorrect login or password!!!");
          }
        }
      } else {
        //L=1 T=1 P=0 NP=0
        //Update Token if token and login are present
        usersService.checkLoginAndUpdateTokenInDb(userInfo, userLogin);
      }
    }
    usersService.addCarsAndUserPoints(userInfo);
    return userInfo;
  }

  void convertUserLoginBlankToNull(UserLogin userLogin) {
    if (userLogin.getUserLogin() != null) {
      if (userLogin.getUserLogin().trim().equals("")) {
        userLogin.setUserLogin(null);
      }
    }
    if (userLogin.getUserToken() != null) {
      if (userLogin.getUserToken().trim().equals("")) {
        userLogin.setUserToken(null);
      }
    }
    if (userLogin.getUserPasswordNew() != null) {
      if (userLogin.getUserPasswordNew().trim().equals("")) {
        userLogin.setUserPasswordNew(null);
      }
    }
    if (userLogin.getUserPassword() != null) {
      if (userLogin.getUserPassword().trim().equals("")) {
        userLogin.setUserPassword(null);
      }
    }
  }


}
