package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ua.com.danit.dto.ApiResponse;
import ua.com.danit.dto.AuthResponse;
import ua.com.danit.dto.LoginRequest;
import ua.com.danit.dto.SignUpRequest;
import ua.com.danit.entity.AuthProvider;
import ua.com.danit.entity.User;
import ua.com.danit.error.BadRequestException;
import ua.com.danit.repository.UsersRepository;
import ua.com.danit.security.TokenProvider;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UsersRepository usersRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private TokenProvider tokenProvider;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginRequest.getEmail(),
            loginRequest.getPassword()
        )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String token = tokenProvider.createToken(authentication);
    return ResponseEntity.ok(new AuthResponse(token));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    if (usersRepository.existsByUserMail(signUpRequest.getEmail())) {
      throw new BadRequestException("Email address already in use.");
    }

    // Creating user's account
    User user = new User();
    user.setUserName(signUpRequest.getName());
    user.setUserMail(signUpRequest.getEmail());
    user.setUserPassword(signUpRequest.getPassword());
    user.setProvider(AuthProvider.local);

    user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));

    User result = usersRepository.save(user);

    URI location = ServletUriComponentsBuilder
        .fromCurrentContextPath().path("/user/me")
        .buildAndExpand(result.getUserId()).toUri();

    return ResponseEntity.created(location)
        .body(new ApiResponse(true, "User registered successfully@"));
  }

}
