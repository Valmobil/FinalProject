package ua.com.danit.repository;

import org.hibernate.cfg.JPAIndexHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.PswdResetToken;

public interface PswdResetTokenRepository extends JpaRepository<PswdResetToken, Long> {
  PswdResetToken findFirstByToken(String token);
}
