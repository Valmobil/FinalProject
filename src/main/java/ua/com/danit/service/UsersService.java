package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Point;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.model.UserInfo;
import ua.com.danit.model.UserLogin;
import ua.com.danit.repository.CarsRepository;
import ua.com.danit.repository.PointsRepository;
import ua.com.danit.repository.UserPointsRepository;
import ua.com.danit.repository.UsersRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UsersService {
  private UsersRepository usersRepository;
  private UserPointsRepository userPointsRepository;
  private CarsRepository carsRepository;
  private PointsRepository pointsRepository;
  private LoginsService loginsService;

  private static final int dateShift = 30;

  @Autowired
  public UsersService(UsersRepository usersRepository,
                      UserPointsRepository userPointRepository,
                      CarsRepository carsRepository,
                      PointsRepository pointsRepository,
                      LoginsService loginsService) {
    this.usersRepository = usersRepository;
    this.userPointsRepository = userPointRepository;
    this.carsRepository = carsRepository;
    this.pointsRepository = pointsRepository;
    this.loginsService = loginsService;
  }

  public User createNewUsers(User users) {
    return usersRepository.save(users);
  }

  public User getUserById(Long userId) {
    return usersRepository.getOne(userId);
  }

  public String passwordEncrypt(String userPasswordNew) {
    //!!!!! Write password encryption procedure
    return userPasswordNew;
  }

  private User changePassword(UserLogin userLogin) {
    User user = checkIfLoginAndPasswordIsCorrect(userLogin);
    if (user != null) {
      user.setUserPassword(passwordEncrypt(userLogin.getUserPasswordNew()));
      user = usersRepository.save(user);
    }
    return user;
  }

  void addCarsAndUserPoints(UserInfo userInfo) {
    //Collect Cars
    userInfo.setCars(carsRepository.findByUser(userInfo.getUser()));
    //Collect User Points
    userInfo.setUserPoints(collectUserPointsAndFillInEmptyOnes(userInfo.getUser()));
  }

  List<UserPoint> collectUserPointsAndFillInEmptyOnes(User user) {
    if (user == null) {
      return new ArrayList<>();
    }
    List<UserPoint> userPoints = userPointsRepository.findByUser(user);
    if (userPoints.size() < 5) {
      if (userPoints.size() < 1) {
        UserPoint pointHome = new UserPoint(null, "Home", "adress", user, 0, 0, null);
        userPoints.add(pointHome);
      }
      if (userPoints.size() < 2) {
        UserPoint pointWork = new UserPoint(null, "Work", "Kyivska obl.", user, 50.570425, 30.2637260, null);
        userPoints.add(pointWork);
      }
      //for test purposes
      if (userPoints.size() < 3) {
        Point point = pointsRepository.getOne(4L);
        UserPoint pointWork = new UserPoint(null, "Boryspil", "Kyivska obl.", user, 0, 0, point);
        userPoints.add(pointWork);
      }
      for (int i = userPoints.size(); i < 5; i++) {
        UserPoint pointOther = new UserPoint(null, "<no point>", "no address", user, 0, 0, null);
        userPoints.add(pointOther);
      }
      userPoints = userPointsRepository.saveAll(userPoints);
    }
    return userPoints;
  }

  void checkLoginAndUpdateTokenInDb(UserInfo userInfo, UserLogin userLogin) {
    User user = checkLogin(userLogin);
    if (user == null) {
      //Save new user based on external token
      user = new User();
      userInfo.setUser(user);
      loginsService.saveLoginToMailOrPhone(userInfo, userLogin);
      user.setUserMail(userLogin.getUserLogin());
    }
    user.setUserExternalToken(userLogin.getUserToken());
    generateNewSessionToken(user);
    user = usersRepository.save(user);
    userInfo.setUser(user);
  }

  void generateNewSessionToken(User user) {
    user.setUserToken(UUID.randomUUID().toString());
    user.setUserTokenValidTo(getCurrentDatePlus(dateShift));
  }

  private LocalDateTime getCurrentDatePlus(Integer dateShift) {
    LocalDateTime date = LocalDateTime.now();
    date = date.plusDays(dateShift);
    return date;
  }

  User checkLogin(UserLogin userLogin) {
    List<User> users;
    if (checkForEmail(userLogin)) {
      // if login is mail
      //check if e-Mail has correct format
      if (!checkEmailFormat(userLogin.getUserLogin())) {
        return null;
      }
      users = usersRepository.findByUserMail(userLogin.getUserLogin());
    } else {
      //if login is phone
      users = usersRepository.findByUserPhone(normalizeMobilePhone(userLogin.getUserLogin()));
    }
    if (users.size() != 1) {
      return null;
    }
    return users.get(0);
  }


  User checkIfLoginAndPasswordIsCorrect(UserLogin userLogin) {
    User user = checkLogin(userLogin);
    if (user == null) {
      return null;
    }
    if (user.getUserPassword().equals(passwordEncrypt(userLogin.getUserPassword()))) {
      return user;
    }
    return null;
  }

  User checkIfSessionTokenIsPresent(UserLogin userLogin) {
    List<User> users = usersRepository.findByUserToken(userLogin.getUserToken());
    if (users.size() != 1) {
      return null;
    } else {
      if (users.get(0).getUserTokenValidTo().isAfter(getCurrentDatePlus(0))) {
        return users.get(0);
      }
    }
    return null;
  }

  static boolean checkEmailFormat(String userMail) {
    Pattern validEmailAddressRegex =
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    Matcher matcher = validEmailAddressRegex.matcher(userMail);
    return matcher.find();
  }

  public static String normalizeMobilePhone(String userPhone) {
    String phone = userPhone.replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace("-", "")
        .trim();
    if (phone.charAt(0) != '+') {
      if (phone.length() == 10) {
        return "+38" + phone;
      } else {
        return "+" + phone;
      }
    }
    return phone;
  }

  boolean checkForEmail(UserLogin userLogin) {
    return userLogin.getUserLogin().contains("@");
  }


  public UserInfo saveUserProfile(User user) {
    usersRepository.save(user);
    UserInfo userInfo = new UserInfo();
    userInfo.setUser(usersRepository.getOne(user.getUserId()));
    addCarsAndUserPoints(userInfo);
    return userInfo;
  }
}
