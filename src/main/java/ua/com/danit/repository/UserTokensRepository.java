package ua.com.danit.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.UserToken;

import java.util.List;

public interface UserTokensRepository extends JpaRepository<UserToken, Long> {
  public UserToken findByUserTokenRead(String userTokenRead);
}
