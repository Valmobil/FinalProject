package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.LoginMode;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.entity.User;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.error.KnownException;
import ua.com.danit.facade.UserFacade;
import ua.com.danit.facade.UserTokenFacade;
import ua.com.danit.repository.UsersRepository;

@Service
public class LoginsService {
  private UsersRepository usersRepository;
  private UsersService usersService;
  private UserTokensService userTokensService;
  private UserFacade userFacade;
  private UserTokenFacade userTokenFacade;

  @Autowired
  public LoginsService(UsersRepository usersRepository,
                       UsersService usersService,
                       UserTokensService userTokensService,
                       UserTokenFacade userTokenFacade,
                       UserFacade userFacade) {
    this.usersRepository = usersRepository;
    this.usersService = usersService;
    this.userTokensService = userTokensService;
    this.userTokenFacade = userTokenFacade;
    this.userFacade = userFacade;
  }

  public String checkPasswordRestore(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    User user;
    if (userLogin.getUserToken() == null) {
      //L=0 T=0 P=0 NP=0
      throw new KnownException("Error! Please fill restore token!");
    } else {
      //L=0 T=1 P=0 NP=0
      //find user by Session Token in DB
      user = userTokensService.findUserByAccessToken(userLogin.getUserToken());
    }
    return "Ok. Password was changed! Please login using new password!";
  }

//  public String checkPasswordChange(UserLogin userLogin) {
//    convertUserLoginBlankToNull(userLogin);
//    User user;
//    if (userLogin.getUserLogin() == null) {
//      //L=0 T=0 P=0 NP=0
//      throw new KnownException("Error! Have no user login!");
//    } else {
//      if (userLogin.getUserPassword() == null) {
//        //L=1 T=0 P=0 NP=0
//        throw new KnownException("Error: incorrect old password!");
//      } else {
//        //L=1 T=0 P=1 NP=0
//        user = usersService.checkIfPasswordIsCorrect(userLogin);
//        if (user == null) {
//          throw new KnownException("Error: incorrect login or password!");
//        }
//        //Save new password
//        user.setUserPassword(userLogin.getUserPasswordNew());
//        usersRepository.save(user);
//      }
//      return "Ok, Password was changed successfully!";
//    }
//  }

//  public UserResponse checkSignUpCredentials(UserLogin userLogin) {
//    convertUserLoginBlankToNull(userLogin);
//    User user = createNewEmptyUser();
//    if (userLogin.getUserLogin() == null) {
//      if (userLogin.getUserToken() == null) {
//        //L=0 T=0 P=0 NP=0
//        throw new KnownException("Error! Please fill user login with phone or e-Mail or use Google/Facebook authorization!");
//      } else {
//        //L=0 T=1 P=0 NP=0
//        //find user by Valid Access Token in DB
//        user = userTokensService.findUserByAccessToken(userLogin.getUserToken());
//        if (user == null) {
//          throw new KnownException("Error: have no e-Mail for your external token!");
//        }
//      }
//    } else {
//      if (userLogin.getUserToken() == null) {
//        if (userLogin.getUserPassword() == null) {
//          //L=1 T=0 P=0 NP=0
//          throw new KnownException("Error: incorrect password!");
//        } else {
//          if (userLogin.getUserPasswordNew() == null
//              || !userLogin.getUserPassword().equals(userLogin.getUserPasswordNew())) {
//            //L=1 T=0 P=1 NP=0
//            throw new KnownException("Error: Please repeat password correctly!");
//          } else {
//            //L=1 T=0 P=1 NP=1
//            user = usersService.checkLogin(userLogin);
//            if (user == null) {
//              //Add new user with new credentials
//              user = new User();
//              saveLoginToMailOrPhone(user, userLogin);
//              user.setUserPassword(usersService.passwordEncrypt(userLogin.getUserPassword()));
//
//            } else {
//              throw new KnownException("Error: The user with this login was already registered!");
//            }
//          }
//        }
//      } else {
//        //L=1 T=1 P=0 NP=0
//        //Update Token if token and login are present
//        user = usersService.checkLoginAndUpdateExternalTokenInDb(userLogin, user);
//      }
//    }
//    user = usersService.updateUserTokenInUserEntity(user);
//    //Collect User Points
//    user.setUserPoints(usersService.collectUserPointsAndFillInEmptyOnes(user));
//    user = usersRepository.save(user);
//    return userFacade.mapEntityToResponse(user);
//  }
//
//  void saveLoginToMailOrPhone(User user, UserLogin userLogin) {
//    if (usersService.checkForEmail(userLogin)) {
//      // if login is mail
//      //check if e-Mail has correct format
//      if (!usersService.checkEmailFormat(userLogin.getUserLogin())) {
//        throw new KnownException("Error: e-Mail address format is not correct!");
//      }
//      user.setUserMail(userLogin.getUserLogin());
//    } else {
//      //if login is phone
//      user.setUserPhone(usersService.normalizeMobilePhone(userLogin.getUserLogin()));
//    }
//  }

  public UserResponse checkLoginSignInSignUp(UserLogin userLogin, String endPointMode) {
    convertUserLoginBlankToNull(userLogin);
    User user = usersService.createNewEmptyUser();
    LoginMode mode = defineMode(userLogin, endPointMode);

    if ("LoginByAccessToken".equals(mode.getMode()) && "SignIn".equals(mode.getEndPoint())) {
      user = userTokensService.findUserByAccessToken(userLogin.getUserToken());

    } else if ("LoginByExternalToken".equals(mode.getMode()) && "SignIn".equals(mode.getEndPoint())) {
      if (mode.getIsEmail()) {
        usersService.checkEmailFormat(userLogin.getUserLogin());
        user = usersService.findByEmail(userLogin.getUserLogin(),mode.getMode(),user);
      } else {
        throw new KnownException("Error: External system provides incorrect eMail! Please contact support!");
      }
      usersService.checkUserStructure(user);
      usersService.checkExternalTokenAndUpdateUser(userLogin, user);
    } else if ("LoginByPassword".equals(mode.getMode()) && "SignIn".equals(mode.getEndPoint())) {
      if (mode.getIsEmail()) {
        usersService.checkEmailFormat(userLogin.getUserLogin());
        user = usersService.findByEmail(userLogin.getUserLogin(),"", user);
      } else {
        userLogin.setUserLogin(usersService.normalizeAndCheckPhoneFormat(userLogin.getUserLogin()));
        user = usersService.findByPhone(userLogin.getUserLogin());
      }
      usersService.checkIfPasswordIsCorrect(userLogin, user);
    }
    user = usersService.updateUserTokenInUserEntity(user);
    //Collect User Points
    user.setUserPoints(usersService.collectUserPointsAndFillInEmptyOnes(user));
    user = usersRepository.save(user);
    return userFacade.mapEntityToResponse(user);
  }

  private LoginMode defineMode(UserLogin userLogin, String endPointMode) {
    LoginMode loginMode = new LoginMode();
    loginMode.setEndPoint(endPointMode);
    if (userLogin.getUserToken() != null) {
      if (userLogin.getUserLogin() == null) {
        loginMode.setMode("LoginByAccessToken");
        return loginMode;
      } else {
        loginMode.setMode("LoginByExternalToken");
        if (usersService.checkForEmail(userLogin)) {
          loginMode.setIsEmail(true);
        } else {
          loginMode.setIsEmail(false);
        }
        return loginMode;
      }
    }
    if (userLogin.getUserPassword() == null) {
      throw new KnownException("Error: incorrect login or password!");
    }
    if (endPointMode.equals("signUp")) {
      if (!userLogin.getUserPassword().equals(userLogin.getUserPasswordNew())) {
        throw new KnownException("Error: incorrect login or password!");
      }
    }
    loginMode.setMode("LoginByPassword");
    if (usersService.checkForEmail(userLogin)) {
      loginMode.setIsEmail(true);
    } else {
      loginMode.setIsEmail(false);
    }
    return loginMode;
  }

//  public UserResponse checkLoginSignInCredentials(UserLogin userLogin) {
//      convertUserLoginBlankToNull(userLogin);
//      User user = createNewEmptyUser();
//      if (userLogin.getUserLogin() == null) {
//        if (userLogin.getUserToken() == null) {
//          //L=0 T=0 P=0 NP=0
//          throw new KnownException("Error! Have no user with such login!");
//        } else {
//          //L=0 T=1 P=0 NP=0
//          //find user by Session Token in DB
//          user = userTokensService.findUserByAccessToken(userLogin.getUserToken());
//        }
//      } else {
//        if (userLogin.getUserToken() == null) {
//          if (userLogin.getUserPassword() == null) {
//            //L=1 T=0 P=0 NP=0
//            throw new KnownException("Error: incorrect login or password!");
//          } else {
//            //L=1 T=0 P=1 NP=0
//            user = usersService.checkIfPasswordIsCorrect(userLogin);
//            if (user == null) {
//              throw new KnownException("Error: incorrect login or password!");
//            }
//          }
//        } else {
//          //L=1 T=1 P=0 NP=0
//          //Update Token if token and login are present
//          user = usersService.checkLoginAndUpdateExternalTokenInDb(userLogin, user);
//        }
//      }
//      user = usersService.updateUserTokenInUserEntity(user);
//      //Collect User Points
//      user.setUserPoints(usersService.collectUserPointsAndFillInEmptyOnes(user));
//      user = usersRepository.save(user);
//    return userFacade.mapEntityToResponse(user);
//  }


  public void convertUserLoginBlankToNull(UserLogin userLogin) {
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
