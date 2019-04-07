package ua.com.danit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.com.danit.entity.User;
import ua.com.danit.repository.UsersRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  UsersRepository usersRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String usernameOrEmail)
      throws UsernameNotFoundException {
    // Let people login with either username or email
    User user = usersRepository.findByUserNameOrUserMail(usernameOrEmail, usernameOrEmail)
        .orElseThrow(() ->
            new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
        );

    return UserPrincipal.create(user);
  }

  // This method is used by JWTAuthenticationFilter
  @Transactional
  public UserDetails loadUserById(Long id) {
    User user = usersRepository.findById(id).orElseThrow(
        () -> new UsernameNotFoundException("User not found with id : " + id)
    );

    return UserPrincipal.create(user);
  }
}