package ua.com.danit.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Users;
import ua.com.danit.repository.UsersRepository;

import java.util.List;

@Service
public class UsersService {
  private UsersRepository usersRepository;

  @Autowired
  public UsersService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

//    public Users createNewUsers(Users users) {
//        return usersRepository.save(users);
//    }

  public Users getUsersById(Long userId) {
    return usersRepository.getOne(userId);
  }

//    public List<Users> findAll() {
//        return (usersRepository.findAll();
//    }
}
