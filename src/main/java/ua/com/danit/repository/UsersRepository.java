package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.com.danit.entity.User;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {

  List<User> findByUserPhone(String userPhone);

  List<User> findByUserMail(String userMail);

  List<User> findByUserTokenRefresh(String userMail);

  User findByUserId(Long userId);

  List<User> findByUserIdIn(List<Long> userIds);

  List<User> findByUserTokenExternal(String userMail);

  Boolean existsByUserName(String username);

  Boolean existsByUserMail(String email);
}
