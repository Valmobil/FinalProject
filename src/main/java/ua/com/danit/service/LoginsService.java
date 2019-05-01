package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.UserResponce;
import ua.com.danit.entity.User;
import ua.com.danit.dto.UserInfo;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.error.KnownException;
import ua.com.danit.facade.UserFacade;
import ua.com.danit.repository.UserTokensRepository;
import ua.com.danit.repository.UsersRepository;

import java.lang.management.LockInfo;
import java.util.List;

import static ua.com.danit.service.UsersService.checkEmailFormat;
import static ua.com.danit.service.UsersService.normalizeMobilePhone;

@Service
public class LoginsService {
  private UsersRepository usersRepository;
  private UsersService usersService;
  private UserTokensService userTokensService;
  private UserTokensRepository userTokensRepository;
  private UserFacade userFacade;

  @Autowired
  public LoginsService(UsersRepository usersRepository,
                       UsersService usersService,
                       UserTokensService userTokensService,
                       UserTokensRepository userTokensRepository,
                       UserFacade userFacade) {
    this.usersRepository = usersRepository;
    this.usersService = usersService;
    this.userTokensService = userTokensService;
    this.userTokensRepository = userTokensRepository;
    this.userFacade = userFacade;
  }

  public String checkPasswordRestore(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    UserInfo userInfo = new UserInfo();
    if (userLogin.getUserToken() == null) {
      //L=0 T=0 P=0 NP=0
      throw new KnownException("Error! Please fill restore token!");
    } else {
      //L=0 T=1 P=0 NP=0
      //find user by Session Token in DB
      userInfo.setUser(userTokensService.findUserByAccessToken(userLogin.getUserToken()));
      if (userInfo.getUser() == null) {
        throw new KnownException("Error: Incorrect or expired Token!");
      }
    }
    return "Ok. Password was changed! Please login using new password!";
  }

  public String checkPasswordChange(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    UserInfo userInfo = new UserInfo();
    if (userLogin.getUserLogin() == null) {
      //L=0 T=0 P=0 NP=0
      return "Error! Have no user login!";
    } else {
      if (userLogin.getUserPassword() == null) {
        //L=1 T=0 P=0 NP=0
        return "Error: incorrect old password!";
      } else {
        //L=1 T=0 P=1 NP=0
        userInfo.setUser(usersService.checkIfLoginAndPasswordIsCorrect(userLogin));
        if (userInfo.getUser() == null) {
          return "Error: incorrect login or password!";
        }
        //Save new password
        userInfo.getUser().setUserPassword(userLogin.getUserPasswordNew());
        usersRepository.save(userInfo.getUser());
      }
      return "Ok, Password was changed successfully!";
    }
  }

  public UserResponce checkRegistrationCredentials(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);

    User user = new User();
    if (userLogin.getUserLogin() == null) {
      if (userLogin.getUserToken() == null) {
        //L=0 T=0 P=0 NP=0
        throw new KnownException("Error! Please fill user login with phone or e-Mail or use Google/Facebook authorization!");
      } else {
        //L=0 T=1 P=0 NP=0
        //find user by Valid Access Token in DB
        user = userTokensService.findUserByAccessToken(userLogin.getUserToken());
        if (user == null) {
          throw new KnownException("Error: have no e-Mail for your external token!");
        }
      }
    } else {
      if (userLogin.getUserToken() == null) {
        if (userLogin.getUserPassword() == null) {
          //L=1 T=0 P=0 NP=0
          throw new KnownException("Error: incorrect password!");
        } else {
          if (userLogin.getUserPasswordNew() == null
              || !userLogin.getUserPassword().equals(userLogin.getUserPasswordNew())) {
            //L=1 T=0 P=1 NP=0
            throw new KnownException("Error: Please repeat password correctly!");
          } else {
            //L=1 T=0 P=1 NP=1
            user = usersService.checkLogin(userLogin);
            if (user == null) {
              //Add new user with new credentials
              user = new User();
              saveLoginToMailOrPhone(user, userLogin);
              user.setUserPassword(usersService.passwordEncrypt(userLogin.getUserPassword()));
              user = usersService.updateUserTokenInUserEntity(user);
            } else {
              throw new KnownException("Error: The user with this login was already registered!");
            }
          }
        }
      } else {
        //L=1 T=1 P=0 NP=0
        //Update Token if token and login are present
        usersService.checkLoginAndUpdateExternalTokenInDb(userLogin);
      }
    }
    return userFacade.mapEntityToResponce(user);
  }

  void saveLoginToMailOrPhone(User user, UserLogin userLogin) {
    if (usersService.checkForEmail(userLogin)) {
      // if login is mail
      //check if e-Mail has correct format
      if (!checkEmailFormat(userLogin.getUserLogin())) {
        throw new KnownException("Error: e-Mail address format is not correct!");
      }
      user.setUserMail(userLogin.getUserLogin());
    } else {
      //if login is phone
      user.setUserPhone(normalizeMobilePhone(userLogin.getUserLogin()));
    }
  }

  public UserResponce checkLoginSignInCredentials(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    User user = new User();
    if (userLogin.getUserLogin() == null) {
      if (userLogin.getUserToken() == null) {
        //L=0 T=0 P=0 NP=0
        throw new KnownException("Error! Have no user with such login!");
      } else {
        //L=0 T=1 P=0 NP=0
        //find user by Session Token in DB
        user = userTokensService.findUserByAccessToken(userLogin.getUserToken());
        if (user == null) {
          throw new KnownException("Error: have no valid session token!");
        }
      }
    } else {
      if (userLogin.getUserToken() == null) {
        if (userLogin.getUserPassword() == null) {
          //L=1 T=0 P=0 NP=0
          throw new KnownException("Error: incorrect login or password!");
        } else {
          //L=1 T=0 P=1 NP=0
          user = usersService.checkIfLoginAndPasswordIsCorrect(userLogin);
          if (user == null) {
            throw new KnownException("Error: incorrect login or password!");
          }
        }
      } else {
        //L=1 T=1 P=0 NP=0
        //Update Token if token and login are present
        usersService.checkLoginAndUpdateExternalTokenInDb(userLogin);
      }
    }
    return userFacade.mapEntityToResponce(user);
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
