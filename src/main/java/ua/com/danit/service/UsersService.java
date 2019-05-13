package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.LoginMode;
import ua.com.danit.dto.UserTokenResponse;
import ua.com.danit.entity.UserCar;
import ua.com.danit.entity.Point;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.entity.UserToken;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.error.KnownException;
import ua.com.danit.facade.UserTokenFacade;
import ua.com.danit.repository.PointsRepository;
import ua.com.danit.repository.UserPointsRepository;
import ua.com.danit.repository.UserTokensRepository;
import ua.com.danit.repository.UsersRepository;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UsersService {
  private UsersRepository usersRepository;
  private UserPointsRepository userPointsRepository;
  private PointsRepository pointsRepository;
  private UserTokensService userTokensService;
  private UserTokensRepository userTokensRepository;
  private UserTokenFacade userTokenFacade;

  @Autowired
  public UsersService(UsersRepository usersRepository,
                      UserPointsRepository userPointRepository,
                      PointsRepository pointsRepository,
                      UserTokensService userTokensService,
                      UserTokenFacade userTokenFacade,
                      UserTokensRepository userTokensRepository) {
    this.usersRepository = usersRepository;
    this.userPointsRepository = userPointRepository;
    this.pointsRepository = pointsRepository;
    this.userTokensService = userTokensService;
    this.userTokensRepository = userTokensRepository;
    this.userTokenFacade = userTokenFacade;
  }

  @Autowired
  LoginsService loginService;

  private String passwordEncrypt(String userPasswordNew) {
    //!!!!! Write password encryption procedure
    return userPasswordNew;
  }

  User changePassword(String newPassword, User user) {
    user.setUserPassword(passwordEncrypt(newPassword));
    return user;
  }

  List<UserPoint> collectUserPointsAndFillInEmptyOnes(User user) {
    if (user == null) {
      return new ArrayList<>();
    }
    List<UserPoint> userPoints;
    if (user.getUserId() == null) {
      userPoints = new LinkedList<>();
    } else {
      userPoints = userPointsRepository.findByUser(user);
    }
    if (userPoints.size() < 5) {
      if (userPoints.size() < 1) {
        UserPoint pointHome = new UserPoint(null, "Home", "adress", user, 0, 0);
        userPoints.add(pointHome);
      }
      if (userPoints.size() < 2) {
        UserPoint pointWork = new UserPoint(null, "Work", "Kyivska obl.", user, 50.570425, 30.2637260);
        userPoints.add(pointWork);
      }
      //for test purposes
      if (userPoints.size() < 3) {
        Point point = pointsRepository.getOne(4L);
        UserPoint pointWork = new UserPoint(null, "Boryspil", "Kyivska obl.", user, 0, 0);
        userPoints.add(pointWork);
      }
      for (int i = userPoints.size(); i < 5; i++) {
        UserPoint pointOther = new UserPoint(null, "<no point>", "no address", user, 0, 0);
        userPoints.add(pointOther);
      }
//      userPoints = userPointsRe?pository.saveAll(userPoints);
    }
    return userPoints;
  }


  void checkExternalTokenAndUpdateUser(UserLogin userLogin, User user) {
    //Check if Old External token mail correspond with existing mail
    user.getUserTokens().get(0).setUserTokenExternal(userLogin.getUserToken());
  }

  User updateUserTokenInUserEntity(User user) {
    UserTokenResponse userTokenResponse = userTokensService.generateInitialTokinSet();
    if (user.getUserTokens() == null) {
      user.setUserTokens(new LinkedList<>());
    }
    if (user.getUserTokens().size() == 0) {
      user.getUserTokens().add(0, userTokenFacade.mapRequestDtoToEntity(userTokenResponse, new UserToken()));
      user.getUserTokens().get(0).setUser(user);
    } else {
      user.getUserTokens().set(0, userTokenFacade.mapRequestDtoToEntity(userTokenResponse, user.getUserTokens().get(0)));
    }
    return user;
  }

  void checkIfPasswordIsCorrect(UserLogin userLogin, User user) {
    if (user.getUserPassword() == null) {
      throw new KnownException("Error: Your account was found! But... in order to set new password please user Forgot"
          + " Password link!");
    }
    if (!user.getUserPassword().equals(passwordEncrypt(userLogin.getUserPassword()))) {
      throw new KnownException("Error: incorrect login or password!");
    }
  }

  void checkEmailFormat(String userMail) {
    Pattern validEmailAddressRegex =
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    Matcher matcher = validEmailAddressRegex.matcher(userMail);
    if (!matcher.find()) {
      throw new KnownException("Error: Incorrect eMail, please check!");
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
      throw new KnownException("Error: Incorrect phone number!");
    }
    return phone;
  }

  boolean checkForEmail(UserLogin userLogin) {
    return userLogin.getUserLogin().contains("@");
  }


  public User putUserProfile(User user, User userFromToken) {
    //Update some fields
    if (userFromToken == null) {
      throw new KnownException("Error: Access token not found!");
    }
    user.setUserId(userFromToken.getUserId());
    if (user.getUserCars() != null) {
      for (UserCar userCar : user.getUserCars()) {
        userCar.setUser(user);
      }
    }
    user = usersRepository.save(user);
    return user;
  }

  User findUserByEmail(String userLogin, LoginMode mode, User user) {
    List<User> users = usersRepository.findByUserMail(userLogin);
    if (users.size() == 0) {
      if ("LoginByExternalToken".equals(mode.getMode()) || "SignUp".equals(mode.getEndPoint())) {
        user.setUserMail(userLogin);
      } else {
        throw new KnownException("Error: User with eMail " + userLogin + " has not been found!");
      }
    }
    if (users.size() > 1) {
      throw new KnownException("Error: Several Users with eMail " + userLogin + " have been found! Please "
          + "contact support team!");
    }
    if (users.size() == 1) {
      if ("SignUp".equals(mode.getEndPoint())) {
        throw new KnownException("Error: User with eMail " + userLogin + " already registered in database! Please Login!");
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
        throw new KnownException("Error: User with Phone " + userLogin + " has not been found!");
      }
    }
    if (users.size() > 1) {
      throw new KnownException("Error: Several Users with Phone " + userLogin + " have been found! Please contact"
          + " support team!");
    }
    if (users.size() == 1) {
      if ("SignUp".equals(mode.getEndPoint())) {
        throw new KnownException("Error: Several Users with Phone " + userLogin + " already registered in database!"
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
      throw new KnownException("Error: User has Several Users Tokens by system mistake! Please contact support team");
    }
    if (user.getUserTokens().size() == 0) {
      user.getUserTokens().add(new UserToken());
      user.getUserTokens().get(0).setUser(user);
    }
  }
}