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
    generateNewSessionToken("Refresh", userToken);
    generateNewSessionToken("Access", userToken);
    return userToken;
  }

  public UserToken requestNewTokenService(UserToken userToken) {
    if (userToken == null) {
      return null;
    }
    UserToken userTokenDb = userTokensRepository.findByUserTokenRefresh(userToken.getUserTokenRefresh());
    if (userTokenDb == null) {
      return null;
    }

    //    if (userToken.getUserTokenAccess().equals(userTokenDb.getUserTokenAccess())) {
    if (userTokenDb.getUserTokenRefreshTo().isAfter(LocalDateTime.now())) {
      //If Refresh token are valid
      generateNewSessionToken("Refresh", userTokenDb);
      generateNewSessionToken("Access", userTokenDb);
      userTokenDb = userTokensRepository.save(userTokenDb);
      return userTokenDb;
    } else {
      userTokensRepository.delete(userTokenDb);
      return null;
      //    return generateInitialTokinSet(new User());
    }
  }

  private void generateNewSessionToken(String stype, UserToken userToken) {
    int dateShift;
    LocalDateTime date = LocalDateTime.now();
    if (stype.equals("Refresh")) {
      userToken.setUserTokenAccess(UUID.randomUUID().toString());
      dateShift = 15;
      date = date.plusMinutes(dateShift);
      userToken.setUserTokenAccessTo(date);
    } else {
      userToken.setUserTokenRefresh(UUID.randomUUID().toString());
      dateShift = 60 * 24 * 30;
      date = date.plusMinutes(dateShift);
      userToken.setUserTokenRefreshTo(date);
    }
  }
}

