package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.entity.UserLogin;
import ua.com.danit.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService {
  private UsersRepository usersRepository;

  @Autowired
  public UsersService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public User createNewUsers(User users) {
    return usersRepository.save(users);
  }

  public User getUserById(Long userId) {
    return usersRepository.getOne(userId);
  }

  public User checkUserCredentials(UserLogin userLogin) {
    List<User> users = usersRepository.findByUserPhone(userLogin.getUserPhone());
    for (User user : users) {
      if (user.getUserPassword().equals(userLogin.getUserPassword())) {
        return user;
      }
    }
    return null;
  }

  //    public List<User> findAll() {
  //        return (usersRepository.findAll();
  //    }
}
