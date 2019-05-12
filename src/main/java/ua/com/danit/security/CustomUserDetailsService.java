package ua.com.danit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.com.danit.entity.User;
import ua.com.danit.error.ResourceNotFoundException;
import ua.com.danit.repository.UsersRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  UsersRepository usersRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email)
      throws UsernameNotFoundException {
    //TODO ...maybe Optional<User>???
    User user = usersRepository.findByUserMail(email)
        .stream().findFirst()
        .orElseThrow(() ->
            new UsernameNotFoundException("User not found with email : " + email)
        );

    return UserPrincipal.create(user);
  }

  @Transactional
  public UserDetails loadUserById(Long id) {
    User user = usersRepository.findById(id).orElseThrow(
        () -> new ResourceNotFoundException("User", "id", id)
    );

    return UserPrincipal.create(user);
  }
}
