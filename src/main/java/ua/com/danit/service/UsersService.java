package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.LoginMode;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.dto.UserTokenResponse;
import ua.com.danit.entity.UserCar;
import ua.com.danit.entity.Point;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.entity.UserToken;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.facade.UserFacade;
import ua.com.danit.facade.UserTokenFacade;
import ua.com.danit.repository.PointsRepository;
import ua.com.danit.repository.UserCarsRepository;
import ua.com.danit.repository.UserPointsRepository;
import ua.com.danit.repository.UserTokensRepository;
import ua.com.danit.repository.UsersRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UsersService {
  private UsersRepository usersRepository;
  private PointsRepository pointsRepository;
  private UserTokensService userTokensService;
  private UserTokenFacade userTokenFacade;
  private UserPointsRepository userPointsRepository;
  private UserFacade userFacade;
  private UserCarsRepository userCarsRepository;
  private UserTokensRepository userTokensRepository;

  private static final int userPointsMaxQty = 5;

  @Autowired
  public UsersService(UsersRepository usersRepository,
                      PointsRepository pointsRepository,
                      UserTokensService userTokensService,
                      UserTokenFacade userTokenFacade,
                      UserPointsRepository userPointsRepository,
                      UserCarsRepository userCarsRepository,
                      UserTokensRepository userTokensRepository,
                      UserFacade userFacade) {
    this.usersRepository = usersRepository;
    this.pointsRepository = pointsRepository;
    this.userTokensService = userTokensService;
    this.userTokenFacade = userTokenFacade;
    this.userFacade = userFacade;
    this.userPointsRepository = userPointsRepository;
    this.userCarsRepository = userCarsRepository;
    this.userTokensRepository = userTokensRepository;
  }

  private String passwordEncrypt(String userPasswordNew) {
    //!!!!! Write password encryption procedure
    return userPasswordNew;
  }

  User changePassword(String newPassword, User user) {
    user.setUserPassword(passwordEncrypt(newPassword));
    return user;
  }

  private User collectUserPointsAndFillInEmptyOnes(User user) {
    if (user == null) {
      throw new ApplicationException("Error! Empty user entity!");
    }
    List<UserPoint> userPoints;
    if (user.getUserId() == null) {
      userPoints = new LinkedList<>();
    } else {
      userPoints = userPointsRepository.findByUser(user);
    }
    String[] userPointsDefaultNames = {"Home", "Work", "<no point>", "<no point>", "<no point>"};
    for (int i = userPoints.size(); i < userPointsMaxQty; i++) {
      userPoints.add(new UserPoint(null, userPointsDefaultNames[i], "", user, 0, 0));
    }
    user.setUserPoints(userPoints);
    return user;
  }


  void checkExternalTokenAndUpdateUser(UserLogin userLogin, User user) {
    //Check if Old External token mail correspond with existing mail
    user.getUserTokens().get(0).setUserTokenExternal(userLogin.getUserToken());
  }

  private void updateUserTokenInUserEntity(User user) {
    UserTokenResponse userTokenResponse = userTokensService.generateInitialTokinSet();
    if (user.getUserTokens() == null) {
      user.setUserTokens(userTokensService.findByUser(user));
      if (user.getUserTokens() == null) {
        user.setUserTokens(new LinkedList<>());
      }
    }
    if (user.getUserTokens().size() == 0) {
      user.getUserTokens().add(0, userTokenFacade.mapRequestDtoToEntity(userTokenResponse, new UserToken()));
      user.getUserTokens().get(0).setUser(user);
    } else {
      user.getUserTokens().set(0, userTokenFacade.mapRequestDtoToEntity(userTokenResponse, user.getUserTokens().get(0)));
    }
  }

  void checkIfPasswordIsCorrect(UserLogin userLogin, User user) {
    if (user.getUserPassword() == null) {
      throw new ApplicationException("Error: Your account was found! But... in order to set new password please user Forgot"
          + " Password link!");
    }
    if (!user.getUserPassword().equals(passwordEncrypt(userLogin.getUserPassword()))) {
      throw new ApplicationException("Error: incorrect login or password!");
    }
  }

  void checkEmailFormat(String userMail) {
    Pattern validEmailAddressRegex =
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    Matcher matcher = validEmailAddressRegex.matcher(userMail);
    if (!matcher.find()) {
      throw new ApplicationException("Error: Incorrect eMail, please check!");
    }
  }

  public String normalizeAndCheckPhoneFormat(String userPhone) {
    String phone = userPhone.replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace("-", "")
        .trim();
    if (phone.charAt(0) != '+') {
      if (phone.length() == 10) {
        phone = "+38" + phone;
      } else {
        phone = "+" + phone;
      }
    }
    Pattern validEmailAddressRegex =
        Pattern.compile("\\+[0-9]+$");
    Matcher matcher = validEmailAddressRegex.matcher(phone);
    if (!matcher.find()) {
      throw new ApplicationException("Error: Incorrect phone number!");
    }
    return phone;
  }

  boolean checkForEmail(UserLogin userLogin) {
    return userLogin.getUserLogin().contains("@");
  }


  public UserResponse putUserProfile(User user, User userFromToken) {
    if (userFromToken == null) {
      throw new ApplicationException("Error: Access token not found!");
    }
    checkEmailFormat(user.getUserMail());
    user.setUserPhone(normalizeAndCheckPhoneFormat(user.getUserPhone()));
    //Update some fields
    user.setUserId(userFromToken.getUserId());
    user.setUserPassword(userFromToken.getUserPassword());
    user.setCreatedDate(userFromToken.getCreatedDate());
    if (user.getUserPoints() != null && user.getUserPoints().size() > 0) {
      for (UserPoint userPoint : user.getUserPoints()) {
        userPoint.setUser(user);
      }
    } else {
      user.setUserPoints(null);
    }
    if (user.getUserCars() != null) {
      for (UserCar userCar : user.getUserCars()) {
        userCar.setUser(user);
      }
    }
    //Delete other cars
    List<UserCar> carsToDelete = new LinkedList<>();
    for (UserCar userCarOld : userFromToken.getUserCars()) {
      if (!user.getUserCars().contains(userCarOld)) {
        carsToDelete.add(userCarOld);
      }
    }
    if (carsToDelete.size() > 0) {
      userCarsRepository.deleteInBatch(carsToDelete);
    }
    user = projection(user, "", "car", "token", "point");
    user = usersRepository.save(user);
    return userFacade.mapEntityToResponse(user);
  }

  User findUserByEmail(String userLogin, LoginMode mode, User user) {
    List<User> users = usersRepository.findByUserMail(userLogin);
    if (users.size() == 0) {
      if ("LoginByExternalToken".equals(mode.getMode()) || "SignUp".equals(mode.getEndPoint())) {
        user.setUserMail(userLogin);
      } else {
        throw new ApplicationException("Error: User with eMail " + userLogin + " has not been found!");
      }
    }
    if (users.size() > 1) {
      throw new ApplicationException("Error: Several Users with eMail " + userLogin + " have been found! Please "
          + "contact support team!");
    }
    if (users.size() == 1) {
      if ("SignUp".equals(mode.getEndPoint())) {
        throw new ApplicationException("Error: User with eMail " + userLogin + " already registered in database! "
            + "Please Login!");
      } else {
        user = users.get(0);
      }
    }
    return user;
  }

  User findUserByPhone(String userLogin, LoginMode mode, User user) {
    List<User> users = usersRepository.findByUserPhone(userLogin);
    if (users.size() == 0) {
      if ("SignUp".equals(mode.getEndPoint())) {
        user.setUserPhone(userLogin);
      } else {
        throw new ApplicationException("Error: User with Phone " + userLogin + " has not been found!");
      }
    }
    if (users.size() > 1) {
      throw new ApplicationException("Error: Several Users with Phone " + userLogin + " have been found! Please contact"
          + " support team!");
    }
    if (users.size() == 1) {
      if ("SignUp".equals(mode.getEndPoint())) {
        throw new ApplicationException("Error: Several Users with Phone " + userLogin + " already registered in database!"
            + " Please login!");
      } else {
        user = users.get(0);
      }
    }
    return user;
  }

  User createNewEmptyUser() {
    User user = new User();
    user.setUserTokens(new LinkedList<>());
    user.setUserCars(new LinkedList<>());
    user.setUserPoints(new LinkedList<>());
    return user;
  }

  void checkUserStructure(User user) {
    //userTokens check
    if (user.getUserTokens() == null) {
      user.setUserTokens(new LinkedList<>());
    }
    if (user.getUserTokens().size() > 1) {
      throw new ApplicationException("Error: User has Several Users Tokens by system mistake! Please contact support team");
    }
    if (user.getUserTokens().size() == 0) {
      user.getUserTokens().add(new UserToken());
      user.getUserTokens().get(0).setUser(user);
    }
  }

  private void updateUserCars(User user) {
    List<UserCar> userCars = userCarsRepository.findByUser(user);
    if (userCars != null && userCars.size() > 0) {
      user.setUserCars(userCars);
    }
  }

  User projection(User user, String endPointMode, String... names) {

    for (String str : names) {
      if ("car".equals(str)) {
        if (user.getUserId() != null) {
          if (user.getUserCars() == null || user.getUserCars().size() == 0) {
            updateUserCars(user);
          }
        }
      }
      if ("token".equals(str)) {
        if (user.getUserTokens() == null || user.getUserTokens().size() == 0
            || user.getUserTokens().get(0).getUserTokenId() == null
            || "SignIn".equals(endPointMode) || "SignUp".equals(endPointMode)) {
          updateUserTokenInUserEntity(user);
        }
      }
      if ("point".equals(str)) {
        if (user.getUserPoints() == null || user.getUserPoints().size() == 0) {
          user = collectUserPointsAndFillInEmptyOnes(user);
        }
      }
    }
    return user;
  }
}