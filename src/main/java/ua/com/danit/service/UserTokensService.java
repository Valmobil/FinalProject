package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;
import ua.com.danit.repository.UserTokensRepository;

import javax.jws.soap.SOAPBinding;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
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
    userToken = userTokensRepository.save(userToken);
    return userToken;
  }


  public UserToken requestNewTokenService(UserToken userToken) {
    if (userToken == null) {
      return null;
    }
    UserToken userTokenDb = userTokensRepository.findByUserTokenRead(userToken.getUserTokenRead());
    if (userToken.getUserTokenAccess() == userTokenDb.getUserTokenAccess()) {
      if (userToken.getUserTokenReadTo().isBefore(LocalDateTime.now())) {
        //All tokens are valid but read token was aspired
        generateNewSessionToken("Read", userTokenDb);
      }
      generateNewSessionToken("Access", userTokenDb);
      userTokenDb = userTokensRepository.save(userTokenDb);
      return userTokenDb;
    } else {
      userTokensRepository.delete(userTokenDb);
    }
    return null;
  }

  public void generateNewSessionToken(String type, UserToken userToken) {
    userToken.setUserTokenRead(UUID.randomUUID().toString());
    int dateShift = 0;
    if (type == "Read") {
      dateShift = 15;
    } else {
      dateShift = 60 * 24 * 30;
    }
    LocalDateTime date = LocalDateTime.now();
    date = date.plusMinutes(dateShift);
    userToken.setUserTokenReadTo(date);
  }
}

