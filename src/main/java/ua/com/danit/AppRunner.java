package ua.com.danit;


import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import ua.com.danit.entity.Users;
import ua.com.danit.repository.UsersRepository;

@SpringBootApplication
@EnableJpaRepositories
//@EnableJpaAuditin
public class AppRunner {
  private static final Logger log = LoggerFactory.getLogger(Application.class);


  public static void main(String[] args) {
    SpringApplication.run(AppRunner.class, args);
  }
}
