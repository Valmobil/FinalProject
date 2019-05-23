package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Car;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;

import java.util.List;

public interface CarsRepository extends JpaRepository<Car, Long> {
  List<Car> findByUser(User user);
}
