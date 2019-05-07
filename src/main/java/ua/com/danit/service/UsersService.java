package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

  public User createNewUsers(User users) {
    return usersRepository.save(users);
  }

  String passwordEncrypt(String userPasswordNew) {
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

  User checkLoginAndUpdateExternalTokenInDb(UserLogin userLogin) {
    User user = checkLogin(userLogin);
    if (user == null) {
      //Save new user based on external token
      user = new User();
      loginService.saveLoginToMailOrPhone(user, userLogin);
      user.setUserMail(userLogin.getUserLogin());
    }
    if (user.getUserTokens().size() > 1) {
      userTokensService.deleteAllByUser(user);
      throw new KnownException("Error! Internal authorization issue - duplicated tokens. Please try to signIn again!");
    }
    //Check if Old External token equal to new External Token
    if (user.getUserTokens().size() == 1) {
      if (user.getUserTokens().get(0).getUserTokenExternal() == null) {
        user.getUserTokens().get(0).setUserTokenExternal(userLogin.getUserToken());
      } else {
        if (!user.getUserTokens().get(0).getUserTokenExternal().equals(userLogin.getUserToken())) {
          throw new KnownException("Error! Previously we used another external authorization provider! Please "
              + "use login and password for login");
        }
      }
    } else {
      //If we have no token
      UserToken userTokenNew = new UserToken();
      userTokenNew.setUser(user);
      userTokenNew.setUserTokenExternal(userLogin.getUserToken());

      if (userTokenNew.getUserTokenExternal() == null) {
        userTokenNew.setUserTokenExternal(userLogin.getUserToken());
      }
    }
    return user;
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

  boolean checkForEmail(UserLogin userLogin) {
    return userLogin.getUserLogin().contains("@");
  }


  public User saveUserProfile(User user, User userFromToken) {
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
}
