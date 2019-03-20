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
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UsersService {
  private UsersRepository usersRepository;
  private UserPointsRepository userPointsRepository;
  private CarsRepository carsRepository;
  private PointsRepository pointsRepository;

  private static final int dateShift = 30;

  @Autowired
  public UsersService(UsersRepository usersRepository,
                      UserPointsRepository userPointRepository,
                      CarsRepository carsRepository,
                      PointsRepository pointsRepository) {
    this.usersRepository = usersRepository;
    this.userPointsRepository = userPointRepository;
    this.carsRepository = carsRepository;
    this.pointsRepository = pointsRepository;
  }

  public User createNewUsers(User users) {
    return usersRepository.save(users);
  }

  public User getUserById(Long userId) {
    return usersRepository.getOne(userId);
  }

  public UserInfo checkUserCredentials(UserLogin userLogin) {
    convertUserLoginBlankToNull(userLogin);
    User user = null;
    if (userLogin.getUserLogin() == null) {
      if (userLogin.getUserToken() == null) {
        if (userLogin.getUserPasswordNew() == null) {
          //L=0 T=0 PN=0
          return null;
        } else {
          //L=0 T=0 PN=1
          //Change password
          user = changePassword(userLogin);
        }
      } else {
        //L=0 T=1
        //find user by Token in DB
        user = checkIfTokenIsPresent(userLogin);
      }
    } else {
      if (userLogin.getUserToken() == null) {
        //L=1 T=0
        //Find user by login
        if (userLogin.getUserLogin() != null) {
          user = checkIfLoginAndPasswordIsCorrect(userLogin);
        }
        if (user == null) {
          return null;
        }
      } else {
        //L=1 T=1
        //Update Token if token and login are present
        user = checkLoginAndUpdateTokenInDb(userLogin, user);
      }
    }
    UserInfo userInfo = new UserInfo();
    addCarsAndUserPoints(userInfo, user);

    return userInfo;
  }

  private String passwordEncrypt(String userPasswordNew) {
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

  private void addCarsAndUserPoints(UserInfo userInfo, User user) {
    userInfo.setUser(user);
    //Collect Cars
    userInfo.setCars(carsRepository.findByUser(user));
    //Collect User Points
    userInfo.setUserPoints(collectUserPointsAndFillInEmptyOnes(user));
  }

  public List<UserPoint> collectUserPointsAndFillInEmptyOnes(User user) {
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

  private void convertUserLoginBlankToNull(UserLogin userLogin) {
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

  private User checkLoginAndUpdateTokenInDb(UserLogin userLogin, User user) {
    user = checkLogin(userLogin);
    if (user == null) {
      return null;
    }
    user.setUserToken(userLogin.getUserToken());
    user.setUserTokenValidTo(getCurrentDatPlus(dateShift));
    user = usersRepository.save(user);
    return user;
  }

  private LocalDateTime getCurrentDatPlus(Integer dateShift) {
    LocalDateTime date = LocalDateTime.now();
    date = date.plusDays(dateShift);
    return date;
  }

  private User checkLogin(UserLogin userLogin) {
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


  private User checkIfLoginAndPasswordIsCorrect(UserLogin userLogin) {
    User user = checkLogin(userLogin);
    if (user == null) {
      return null;
    }
    if (user.getUserPassword().equals(passwordEncrypt(userLogin.getUserPassword()))) {
      return user;
    }
    return null;
  }

  private User checkIfTokenIsPresent(UserLogin userLogin) {
    List<User> users = usersRepository.findByUserToken(userLogin.getUserToken());
    if (users.size() != 1) {
      return null;
    } else {
      if (users.get(0).getUserTokenValidTo().isAfter(getCurrentDatPlus(0))) {
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

  static String normalizeMobilePhone(String userPhone) {
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

  private boolean checkForEmail(UserLogin userLogin) {
    return userLogin.getUserLogin().contains("@");
  }
}
