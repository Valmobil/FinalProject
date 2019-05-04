package ua.com.danit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {


    httpSecurity
        .authorizeRequests().antMatchers("/").permitAll()
        .and()
        .authorizeRequests().antMatchers("/console/**").permitAll();

    httpSecurity.csrf().disable();
    //frameOptions disabled for proper work with H2 database. Must be enabled in prod mode
    httpSecurity.headers().frameOptions().disable();
  }


  @Bean
  public PasswordEncoder delegatingPasswordEncoder() {
    PasswordEncoder defaultEncoder = new StandardPasswordEncoder();
    Map<String, PasswordEncoder> encoders = new HashMap<>();
    encoders.put("bcrypt", new BCryptPasswordEncoder());
    encoders.put("scrypt", new SCryptPasswordEncoder());

    DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder(
        "bcrypt", encoders);
    passwordEncoder.setDefaultPasswordEncoderForMatches(defaultEncoder);

    return passwordEncoder;
  }

}
