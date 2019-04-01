package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Feedback;
import ua.com.danit.entity.User;

import java.util.List;

public interface FeedbacksRepository extends JpaRepository<Feedback, Long> {

  List<Feedback> findByUserWho(User user);

}
