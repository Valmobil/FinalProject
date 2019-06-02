package ua.com.danit.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Configuration
public class DataSourceConfig {

  @Value("${application.credentials.dev-awsdb}")
  private String dbCredentialsDev;

  @Value("${application.credentials.prod-awsdb}")
  private String dbCredentialsProd;

  @Value("${spring.profiles.active}")
  private String springProfileActive;


  @Bean
  public DataSource getDataSource() {
    //AWS DB Prod and Dev

    DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
    Properties prop;
    if (springProfileActive.equals("prod")) {
      prop = getPropertyFromFile(dbCredentialsDev);
    } else if (springProfileActive.equals("dev")) {
      prop = getPropertyFromFile(dbCredentialsDev);
    } else {
      prop = new Properties();
    }
    if (prop.size() == 0) {
      dataSourceBuilder.url("jdbc:h2:mem:final-project-preparation");
      dataSourceBuilder.driverClassName("org.h2.Driver");
      dataSourceBuilder.username("root");
      dataSourceBuilder.password("");
    } else {
      dataSourceBuilder.url(prop.getProperty("spring.datasource.url"));
      dataSourceBuilder.driverClassName(prop.getProperty("spring.datasource.driver-class-name"));
      dataSourceBuilder.username(prop.getProperty("spring.datasource.username"));
      dataSourceBuilder.password(prop.getProperty("spring.datasource.password"));
    }
    return dataSourceBuilder.build();
  }

  private Properties getPropertyFromFile(String filePathName) {
    Properties prop = new Properties();
    try (InputStream input = new FileInputStream(filePathName)) {
      prop.load(input);
    } catch (IOException ex) {
      ex.printStackTrace();
    }
    return prop;
  }

}
