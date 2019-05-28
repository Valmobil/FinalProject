package ua.com.danit.service;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.LoginMode;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.entity.PswdResetToken;
import ua.com.danit.entity.User;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.facade.UserFacade;
import ua.com.danit.facade.UserTokenFacade;
import ua.com.danit.repository.PswdResetTokenRepository;
import ua.com.danit.repository.UsersRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LoginsService {
  private UsersRepository usersRepository;
  private UsersService usersService;
  private UserTokensService userTokensService;
  private UserFacade userFacade;
  private PswdResetTokenRepository pswdResetTokenRepository;

  @Autowired
  public LoginsService(UsersRepository usersRepository, UsersService usersService, UserTokensService userTokensService,
                       UserFacade userFacade, UserTokenFacade userTokenFacade,
                       PswdResetTokenRepository pswdResetTokenRepository) {
    this.usersRepository = usersRepository;
    this.usersService = usersService;
    this.userTokensService = userTokensService;
    this.userFacade = userFacade;
    this.pswdResetTokenRepository = pswdResetTokenRepository;
  }

  public String passwordRestore(UserLogin userLogin) {
    if (StringUtils.isEmpty(userLogin.getUserPasswordNew())) {
      throw new ApplicationException("Error! Please fill in new password!");
    }
    PswdResetToken pswdResetToken = pswdResetTokenRepository.findFirstByToken(userLogin.getUserToken());
    if (pswdResetToken == null) {
      throw new ApplicationException("Error! Please send new Restore Password letter using Forgot Password link on "
          + "login page!");
    }
    if (pswdResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
      throw new ApplicationException("Error! Your restore password link is expired! Please send new Restore Password letter"
          + " using Forgot Password link on login page!");
    }
    User user = pswdResetToken.getUser();
    usersService.changePassword(userLogin.getUserPasswordNew(), user);
    deletePswdResetTokensByUser(user);
    usersRepository.save(user);
    return "Ok. Password was successfully changed!";
  }

  public String passwordChange(UserLogin userLogin, User user) {
    if (userLogin.getUserPassword().equals(userLogin.getUserPasswordNew())) {
      throw new ApplicationException("Error! We cannot set tha same password!");
    }
    usersService.checkIfPasswordIsCorrect(userLogin, user);
    usersService.changePassword(userLogin.getUserPasswordNew(), user);
    usersRepository.save(user);
    return "Ok. Password was successfully changed!";
  }

  public UserResponse checkLoginSignInSignUp(UserLogin userLogin, String endPointMode) {
    User user = usersService.createNewEmptyUser();
    LoginMode mode = defineMode(userLogin, endPointMode);
    boolean knownWay = false;

    if ("LoginByAccessToken".equals(mode.getMode()) && "SignIn".equals(mode.getEndPoint())) {
      user = userTokensService.findUserByAccessToken(userLogin.getUserToken());
      knownWay = true;

    } else if ("LoginByExternalToken".equals(mode.getMode())) {
      if (mode.getIsEmail()) {
        usersService.checkEmailFormat(userLogin.getUserLogin());
        user = usersService.findUserByEmail(userLogin.getUserLogin(), mode, user);
      } else {
        throw new ApplicationException("Error: External system provides incorrect eMail! Please contact support!");
      }
      usersService.checkUserStructure(user);
      usersService.checkExternalTokenAndUpdateUser(userLogin, user);
      knownWay = true;

    } else if ("LoginByPassword".equals(mode.getMode())) {
      if (mode.getIsEmail()) {
        usersService.checkEmailFormat(userLogin.getUserLogin());
        user = usersService.findUserByEmail(userLogin.getUserLogin(), mode, user);
      } else {
        userLogin.setUserLogin(usersService.normalizeAndCheckPhoneFormat(userLogin.getUserLogin()));
        user = usersService.findUserByPhone(userLogin.getUserLogin(), mode, user);
      }
      if ("SignIn".equals(mode.getEndPoint())) {
        usersService.checkIfPasswordIsCorrect(userLogin, user);
      } else {
        usersService.changePassword(userLogin.getUserPasswordNew(), user);
      }
      knownWay = true;
    }
    if (knownWay) {
      user = usersService.projection(user, endPointMode, "car", "token", "point");
      user = usersRepository.save(user);
      return userFacade.mapEntityToResponse(user);
    } else {
      throw new ApplicationException("Error! Unknown request parameters!");
    }
  }

  private LoginMode defineMode(UserLogin userLogin, String endPointMode) {
    LoginMode loginMode = new LoginMode();
    loginMode.setEndPoint(endPointMode);
    if (StringUtils.isNotBlank(userLogin.getUserToken())) {
      if (StringUtils.isBlank(userLogin.getUserLogin())) {
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
    if (StringUtils.isBlank(userLogin.getUserPassword())) {
      throw new ApplicationException("Error: incorrect login or password!");
    }
    if (endPointMode.equals("SignUp")) {
      if (!userLogin.getUserPassword().equals(userLogin.getUserPasswordNew())) {
        throw new ApplicationException("Error: Please repeat password correctly!");
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

  public String receiveMailConfirmation(String token) {
    PswdResetToken pswdResetToken = pswdResetTokenRepository.findFirstByToken(token);
    if (pswdResetToken == null) {
      throw new ApplicationException("Error! Please send e-Mail confirmation letter again using Confirm Button "
          + "from user profile screen!");
    }
    if (pswdResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
      throw new ApplicationException("Error! Your e-Mail confirmation link is expired! Please send e-Mail confirmation "
          + "letter again using Confirm Button from user profile screen!");
    }
    User user = pswdResetToken.getUser();
    //Mail is confirmed
    user.setUserIsConfirmedMail(2);
    user = usersService.projection(user, "SignIn", "token");
    usersRepository.save(user);
    deletePswdResetTokensByUser(user);
    return "Ok. Mail was successfully confirmed! Please sign out and login again!";
  }

  void deletePswdResetTokensByUser(User user) {
    List<PswdResetToken> pswdResetTokens = pswdResetTokenRepository.findByUser(user);
    pswdResetTokenRepository.deleteInBatch(pswdResetTokens);
  }

}
