package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;
import ua.com.danit.repository.UsersRepository;

@Service
public class SecurirtyService {
  private UsersRepository usersRepository;

  @Autowired
  public SecurirtyService(UsersRepository usersRepository) {
    this.usersRepository = usersRepository;
  }

  public User findUserByAccessToken() {
    return usersRepository.findByUserId(1L);
  }

}
