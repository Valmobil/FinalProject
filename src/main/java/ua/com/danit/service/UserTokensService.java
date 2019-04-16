package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;
import ua.com.danit.model.UserLogin;
import ua.com.danit.repository.UserTokensRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserTokensService {
  private UserTokensRepository userTokensRepository;

  @Autowired
  public UserTokensService(UserTokensRepository userTokensRepository) {
    this.userTokensRepository = userTokensRepository;
  }

  public User findUserByAccessToken(String accessToken) {
    List<UserToken> userTokens;
    if (accessToken.substring(0,6).equals("Bearer")) {
      userTokens = userTokensRepository.findByUserTokenAccess(accessToken.substring(7));
    } else {
      userTokens = userTokensRepository.findByUserTokenAccess(accessToken);
    }
    if (userTokens.size() != 1) {
      return null;
    } else {
      if (userTokens.get(0).getUserTokenAccessTo().isAfter(LocalDateTime.now())) {
        return userTokens.get(0).getUser();
      }
    }
    return null;
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

    if (userTokenDb.getUserTokenRefreshTo().isAfter(LocalDateTime.now())) {
      //If Refresh token are valid
      generateNewSessionToken("Refresh", userTokenDb);
      generateNewSessionToken("Access", userTokenDb);
      userTokenDb = userTokensRepository.save(userTokenDb);
      return userTokenDb;
    } else {
      //if Refresh token is expired
      userTokensRepository.delete(userTokenDb);
      return null;
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

