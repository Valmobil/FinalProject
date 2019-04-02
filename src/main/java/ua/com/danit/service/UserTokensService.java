package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;
import ua.com.danit.repository.UserTokensRepository;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserTokensService {
  private UserTokensRepository userTokensRepository;

  @Autowired
  public UserTokensService(UserTokensRepository userTokensRepository) {
    this.userTokensRepository = userTokensRepository;
  }

  public UserToken generateInitialTokinSet(User user) {
    UserToken userToken = new UserToken();
    userToken.setUser(user);
    generateNewSessionToken("Read", userToken);
    generateNewSessionToken("Access", userToken);
    return userToken;
  }

  public UserToken requestNewTokenService(UserToken userToken) {
    if (userToken == null) {
      return null;
    }

    //    UserToken userTokenDb = userTokensRepository.findByUserTokenRead(userToken.getUserTokenRead());
    //    if (userToken.getUserTokenAccess().equals(userTokenDb.getUserTokenAccess())) {
    //      if (userTokenDb.getUserTokenReadTo().isBefore(LocalDateTime.now())) {
    //        //All tokens are valid but read token was aspired
    //        generateNewSessionToken("Read", userTokenDb);
    //      }
    //      generateNewSessionToken("Access", userTokenDb);
    //      userTokenDb = userTokensRepository.save(userTokenDb);
    //      return userTokenDb;
    //    } else {
    //      userTokensRepository.delete(userTokenDb);
    //    }
    //      return null;
    return generateInitialTokinSet(new User());
  }

  public void generateNewSessionToken(String type, UserToken userToken) {
    int dateShift = 0;
    LocalDateTime date = LocalDateTime.now();
    if (type == "Read") {
      userToken.setUserTokenAccess(UUID.randomUUID().toString());
      dateShift = 15;
      date = date.plusMinutes(dateShift);
      userToken.setUserTokenAccessTo(date);
    } else {
      userToken.setUserTokenRead(UUID.randomUUID().toString());
      dateShift = 60 * 24 * 30;
      date = date.plusMinutes(dateShift);
      userToken.setUserTokenReadTo(date);
    }
  }
}

