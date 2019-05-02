package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserTokenResponse;
import ua.com.danit.entity.UserToken;

@Component
public class UserTokenFacade extends AbstractDtoFacade<UserToken, UserTokenResponse,UserTokenResponse>{

  @Override
  public UserTokenResponse mapEntityToResponseDto(UserToken entity) {
    return super.mapEntityToResponseDto(entity);
  }
}
