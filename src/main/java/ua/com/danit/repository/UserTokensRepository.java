package ua.com.danit.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserToken;

import java.util.List;

public interface UserTokensRepository extends JpaRepository<UserToken, Long> {

  List<UserToken> findByUserTokenRefresh(String userTokenRefresh);

  List<UserToken> findByUserTokenAccess(String accessToken);

  List<UserToken> findByUser(User user);

  default void deleteAllByUser(User user) {
    List<UserToken> userTokens = findByUser(user);
    deleteInBatch(userTokens);
  }

}
