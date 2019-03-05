package ua.com.danit;


import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
//@EnableJpaAuditin
public class AppRunner {
  private static final Logger log = LoggerFactory.getLogger(Application.class);


  public static void main(String[] args) {
    SpringApplication.run(AppRunner.class, args);
  }
}
