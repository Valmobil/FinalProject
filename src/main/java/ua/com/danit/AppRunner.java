package ua.com.danit;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import ua.com.danit.config.AppProperties;

@SpringBootApplication
@EnableJpaRepositories
@EnableConfigurationProperties(AppProperties.class)
public class AppRunner {

  public static void main(String[] args) {
    SpringApplication.run(AppRunner.class, args);
  }
}
