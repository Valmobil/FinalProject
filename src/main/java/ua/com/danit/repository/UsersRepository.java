package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.User;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Long> {

  List<User> findByUserPhone(String userPhone);

  List<User> findByUserMail(String userMail);

  Boolean existsByUserMail(String email);

}
