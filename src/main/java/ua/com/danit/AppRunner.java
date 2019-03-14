package ua.com.danit;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
//@EnableJpaAuditin
public class AppRunner {
//  private static final Logger log = LoggerFactory.getLogger(AppRunner.class);


    public static void main(String[] args) {
        SpringApplication.run(AppRunner.class, args);
    }
}
