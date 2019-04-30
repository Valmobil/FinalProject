package ua.com.danit.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;

import java.util.List;

public interface UserTokensRepository extends JpaRepository<UserToken, Long> {

  UserToken findByUserTokenRefresh(String userTokenRefresh);

  List<UserToken> findByUserTokenAccess(String accessToken);

  UserToken findTop1FirstByUser (Long userId);

}
