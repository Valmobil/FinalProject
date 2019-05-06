package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;

import java.util.List;

public interface UserPointsRepository extends JpaRepository<UserPoint, Long> {

  List<UserPoint> findByUser(User user);

}
