package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.repository.UsersRepository;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;

@Service
public class CurrentUsersController {
  private UsersRepository usersRepository;
  public static HashMap<String, Long> listOfActiveUsers;

  @Autowired
  public CurrentUsersController(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  //  public User getCurrentUserByToken(String token) {
  //    //Ask HashMap for current user
  //    Long userId = listOfActiveUsers.get(token);
  //    if (userId == null) {
  ////      checkIfAccessTokenIsValid
  //    }
  //    return new User();
  //  }

}
