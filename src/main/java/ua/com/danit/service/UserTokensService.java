package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;
import ua.com.danit.repository.UserTokensRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserTokensService {
  private UserTokensRepository userTokensRepository;

  private static final int refreshTokenExpirationMin = 30 * 24 * 60;
  private static final int accessTokenExpirationMin = 15;

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


  UserToken generateInitialTokinSet(User user) {
    UserToken userToken = new UserToken();
    userToken.setUser(user);
    generateNewSessionToken("Refresh", userToken);
    generateNewSessionToken("Access", userToken);
    return userToken;
  }

  public ResponseEntity requestNewTokenService(UserToken userToken) {
    if (userToken == null) {
      return new ResponseEntity<>("Error! Empty input JSON!", HttpStatus.NOT_ACCEPTABLE);
    }
    UserToken userTokenDb = userTokensRepository.findByUserTokenRefresh(userToken.getUserTokenRefresh());
    if (userTokenDb == null) {
      return new ResponseEntity<>("Error! Incorrect Refresh Token!",HttpStatus.NOT_ACCEPTABLE);
    }

    if (userTokenDb.getUserTokenRefreshTo().isAfter(LocalDateTime.now())) {
      //If Refresh token are valid
      generateNewSessionToken("Refresh", userTokenDb);
      generateNewSessionToken("Access", userTokenDb);
      userTokenDb = userTokensRepository.save(userTokenDb);
      return new ResponseEntity<>(userTokenDb,HttpStatus.OK);
    } else {
      //if Refresh token is expired
      userTokensRepository.delete(userTokenDb);
      return new ResponseEntity<>("Error! Refresh Token has expired! Please login again!",HttpStatus.NOT_ACCEPTABLE);
    }
  }

  private void generateNewSessionToken(String stype, UserToken userToken) {
    int dateShift;
    LocalDateTime date = LocalDateTime.now();
    if (stype.equals("Refresh")) {
      userToken.setUserTokenAccess(UUID.randomUUID().toString());
      dateShift = accessTokenExpirationMin;
      date = date.plusMinutes(dateShift);
      userToken.setUserTokenAccessTo(date);
    } else {
      userToken.setUserTokenRefresh(UUID.randomUUID().toString());
      dateShift = refreshTokenExpirationMin;
      date = date.plusMinutes(dateShift);
      userToken.setUserTokenRefreshTo(date);
    }
  }
}

