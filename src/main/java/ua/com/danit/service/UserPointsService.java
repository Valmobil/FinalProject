package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserPoint;
import ua.com.danit.repository.UserPointsRepository;
import ua.com.danit.repository.UsersRepository;

import java.util.List;


@Service
public class UserPointsService {
  private UserPointsRepository userPointsRepository;

  @Autowired
  UserPointsService(UserPointsRepository userPointsRepository) {
    this.userPointsRepository = userPointsRepository;
  }

  public String saveUserPoints(List<UserPoint> userPoints, User user) {
    List<UserPoint> userPointsResult = userPointsRepository.saveAll(userPoints);
    if (userPointsResult.size() > 0) {
      return "Ok";
    }
    return null;
  }
}