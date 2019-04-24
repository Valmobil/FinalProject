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
  private UsersRepository usersRepository;
  private UsersService usersService;

  @Autowired
  UserPointsService(UserPointsRepository userPointsRepository, UsersRepository usersRepository, UsersService usersService) {
    this.userPointsRepository = userPointsRepository;
    this.usersRepository = usersRepository;
    this.usersService = usersService;
  }

  public List<UserPoint> getUserPointByUserId(Long userId) {
    User user = usersRepository.getOne(userId);
    List<UserPoint> userPoints = usersService.collectUserPointsAndFillInEmptyOnes(user);
    userPointsRepository.saveAll(userPoints);
    return userPointsRepository.findByUser(user);
  }

  public String saveUserPoints(List<UserPoint> userPoints, User user) {
    //Update userPoint with userInfo
    if (user == null) {
      return "Fail";
    }
    for (UserPoint userPoint : userPoints) {
      userPoint.setUser(user);
    }

    List<UserPoint> userPointsResult = userPointsRepository.saveAll(userPoints);
    if (userPointsResult.size() > 0) {
      return "Ok";
    } else {
      return "Fail";
    }
  }
}