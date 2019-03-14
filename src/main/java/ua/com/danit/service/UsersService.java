package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.model.UserInfo;
import ua.com.danit.model.UserLogin;
import ua.com.danit.repository.CarsRepository;
import ua.com.danit.repository.UserPointRepository;
import ua.com.danit.repository.UsersRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UsersService {
  private UsersRepository usersRepository;
  private UserPointRepository userPointRepository;
  private CarsRepository carsRepository;


  @Autowired
  public UsersService(UsersRepository usersRepository, UserPointRepository userPointRepository, CarsRepository carsRepository) {
    this.usersRepository = usersRepository;
    this.userPointRepository = userPointRepository;
    this.carsRepository = carsRepository;
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
    if (userLogin.getUserLogin() == null && userLogin.getUserToken() != null) {
      //find user by Token in DB
      user = checkIfTokenIsValid(userLogin);
    } else {
      //Find user by login
      if (userLogin.getUserLogin() != null) {
        user = checkIfLoginIsCorrect(userLogin);
      }
      if (user == null) {
        return null;
      }
      //Update Token if token and login are present
      if (userLogin.getUserToken() != null) {
        user = updateTokenInDb(userLogin, user);
      } else {
        //find user by Login (can be e-Mail or Phone)
      }
    }
    UserInfo userInfo = new UserInfo();
    addCarsAndUserPoints(userInfo, user);

    return userInfo;
  }

  private void addCarsAndUserPoints(UserInfo userInfo, User user) {
    userInfo.setUser(user);
    //Collect Cars
    userInfo.setCars(carsRepository.findByUser(user));
    //Collect User Points
    userInfo.setUserPoints(collectUserPointsAndFillInEmptyOnes(user));
  }

  private List<UserPoint> collectUserPointsAndFillInEmptyOnes(User user) {

    List<UserPoint> userPoints = userPointRepository.findByUser(user);
    if (userPoints.size() < 5) {
      if (userPoints.size() < 1) {
        UserPoint pointHome = new UserPoint(null, "Home", "adress", user, 0, 0);
        userPoints.add(pointHome);
      }
      if (userPoints.size() < 2) {
        UserPoint pointWork = new UserPoint(null, "Work", "Kyivska obl.", user, 50.570425, 30.2637260);
        userPoints.add(pointWork);
      }
      for (int i = userPoints.size(); i < 5; i++) {
        UserPoint pointOther = new UserPoint(null, "<no point>", "no address", user, 0, 0);
        userPoints.add(pointOther);
      }
      userPoints = userPointRepository.saveAll(userPoints);
    }
    return userPoints;
  }

  private void convertUserLoginBlankToNull(UserLogin userLogin) {
    if (userLogin.getUserLogin().trim().equals("")) {
      userLogin.setUserLogin(null);
    }
    if (userLogin.getUserToken().trim().equals("")) {
      userLogin.setUserToken(null);
    }
  }

  private User updateTokenInDb(UserLogin userLogin, User user) {
    int dateShift = 30;
    user.setUserToken(userLogin.getUserToken());
    user.setUserTokenValidTo(getCurrentDatPlus(dateShift));
    usersRepository.save(user);
    return user;
  }

  private LocalDateTime getCurrentDatPlus(Integer dateShift) {
    LocalDateTime date = LocalDateTime.now();
    date = date.plusDays(dateShift);
    return date;
  }

  private User checkIfLoginIsCorrect(UserLogin userLogin) {
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
    if (users.get(0).getUserPassword().equals(userLogin.getUserPassword())) {
      return users.get(0);
    }
    return null;
  }

  private User checkIfTokenIsValid(UserLogin userLogin) {
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
