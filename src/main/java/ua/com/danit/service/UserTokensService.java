package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.UserTokenRequest;
import ua.com.danit.dto.UserTokenResponse;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.facade.UserTokenFacade;
import ua.com.danit.repository.UserTokensRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserTokensService {
  private UserTokensRepository userTokensRepository;
  private UserTokenFacade userTokenFacade;

  private static final int refreshTokenExpirationMin = 30 * 24 * 60;
  private static final int accessTokenExpirationMin = 15;

  @Autowired
  public UserTokensService(UserTokensRepository userTokensRepository,
                           UserTokenFacade userTokenFacade) {
    this.userTokensRepository = userTokensRepository;
    this.userTokenFacade = userTokenFacade;
  }

  public User findUserByAccessToken(String accessToken) {
    List<UserToken> userTokens;
    if (accessToken.substring(0, 6).equals("Bearer")) {
      userTokens = userTokensRepository.findByUserTokenAccess(accessToken.substring(7));
    } else {
      userTokens = userTokensRepository.findByUserTokenAccess(accessToken);
    }
    if (userTokens.size() != 1) {
      throw new ApplicationException("Error! User not found for mentioned Access Token!");
    } else {
      if (userTokens.get(0).getUserTokenAccessTo().isAfter(LocalDateTime.now())) {
        return userTokens.get(0).getUser();
      }
      throw new ApplicationException("Error! Access Token is not valid!");
    }
  }

  UserTokenResponse generateInitialTokinSet() {
    UserTokenResponse userTokenResponse = new UserTokenResponse();
    generateNewSessionToken("Refresh", userTokenResponse);
    generateNewSessionToken("Access", userTokenResponse);
    return userTokenResponse;
  }

  public UserTokenResponse requestNewTokenService(UserTokenRequest userTokenRequest) {
    if (userTokenRequest == null) {
      throw new ApplicationException("Error! Empty JSON input!");
    }

    UserToken userTokenDb = findByUserTokenRefresh(userTokenRequest.getUserTokenRefresh());
    if (userTokenDb == null) {
      throw new ApplicationException("Error! Incorrect Refresh Token!");
    }
    if (userTokenDb.getUserTokenRefreshTo().isBefore(LocalDateTime.now())) {
      //if Refresh token is expired
      userTokensRepository.delete(userTokenDb);
      throw new ApplicationException("Error! Refresh Token has expired! Please login again!");
    } else {
      //If Refresh token are valid
      UserTokenResponse userTokenResponse = new UserTokenResponse();
      generateNewSessionToken("Refresh", userTokenResponse);
      generateNewSessionToken("Access", userTokenResponse);
      userTokenDb = userTokenFacade.mapRequestDtoToEntity(userTokenResponse, userTokenDb);
      userTokenDb = userTokensRepository.save(userTokenDb);
      return userTokenFacade.mapEntityToResponseDto(userTokenDb);
    }
  }

  private UserToken findByUserTokenRefresh(String userTokenRefresh) {
    List<UserToken> userTokenList = userTokensRepository.findByUserTokenRefresh(userTokenRefresh);
    if (userTokenList.size() == 0) {
      return null;
    }
    return userTokenList.get(0);
  }

  private void generateNewSessionToken(String stype, UserTokenResponse userTokenResponse) {
    int dateShift;
    LocalDateTime date = LocalDateTime.now();
    if (stype.equals("Refresh")) {
      userTokenResponse.setUserTokenAccess(UUID.randomUUID().toString());
      dateShift = accessTokenExpirationMin;
      date = date.plusMinutes(dateShift);
      userTokenResponse.setUserTokenAccessTo(date);
    } else {
      userTokenResponse.setUserTokenRefresh(UUID.randomUUID().toString());
      dateShift = refreshTokenExpirationMin;
      date = date.plusMinutes(dateShift);
      userTokenResponse.setUserTokenRefreshTo(date);
    }
  }

  void deleteAllByUser(User user) {
    userTokensRepository.deleteAllByUser(user);
  }

  public List<UserToken> findByUser(User user) {
    return userTokensRepository.findByUser(user);
  }
}

