package ua.com.danit;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.PostConstruct;
import java.util.TimeZone;


@SpringBootApplication
@EnableJpaRepositories
//@EnableJpaAuditin
@EntityScan(basePackageClasses = {
    AppRunner.class,
    Jsr310JpaConverters.class
})
public class AppRunner {

  @PostConstruct
  void init() {
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
  }

  public static void main(String[] args) {
    SpringApplication.run(AppRunner.class, args);
  }
}
