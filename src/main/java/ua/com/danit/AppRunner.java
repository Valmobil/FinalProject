package ua.com.danit;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class AppRunner {

  public static void main(String[] args) {
    SpringApplication.run(AppRunner.class, args);
  }
}
