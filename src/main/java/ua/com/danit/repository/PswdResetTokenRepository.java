package ua.com.danit.repository;

import org.hibernate.cfg.JPAIndexHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.PswdResetToken;
import ua.com.danit.entity.User;

import java.util.List;

public interface PswdResetTokenRepository extends JpaRepository<PswdResetToken, Long> {

  PswdResetToken findFirstByToken(String token);

  List<PswdResetToken> findByUser(User user);

}
