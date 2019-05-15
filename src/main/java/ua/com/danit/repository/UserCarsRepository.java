package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.UserCar;
import ua.com.danit.entity.User;

import java.util.List;

public interface UserCarsRepository extends JpaRepository<UserCar, Long> {

  List<UserCar> findByUser(User user);

}
