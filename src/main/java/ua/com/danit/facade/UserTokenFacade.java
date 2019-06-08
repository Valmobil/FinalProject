package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserTokenResponse;
import ua.com.danit.entity.UserToken;

@Component
public class UserTokenFacade extends AbstractDtoFacade<UserToken, UserTokenResponse,UserTokenResponse> {

  public UserToken mapRequestDtoToEntity(UserTokenResponse dto, UserToken entity) {
    UserToken destination = super.mapRequestDtoToEntity(dto);
    destination.setUserTokenId(entity.getUserTokenId());
    destination.setUserTokenExternal(entity.getUserTokenExternal());
    destination.setUser(entity.getUser());
    return destination;
  }
}