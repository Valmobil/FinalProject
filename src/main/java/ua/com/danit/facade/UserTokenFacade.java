package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserTokenResponse;
import ua.com.danit.entity.UserToken;

@Component
public class UserTokenFacade extends AbstractDtoFacade<UserToken, UserTokenResponse,UserTokenResponse> {

  @Override
  public UserTokenResponse mapEntityToResponseDto(UserToken entity) {
    return super.mapEntityToResponseDto(entity);
  }

  public UserToken mapRequestDtoToEntity(UserTokenResponse dto, UserToken source) {
    UserToken destination = super.mapRequestDtoToEntity(dto);
    destination.setUserTokenId(source.getUserTokenId());
    destination.setUserTokenExternal(source.getUserTokenExternal());
    destination.setUser(source.getUser());
    return destination;
  }
}