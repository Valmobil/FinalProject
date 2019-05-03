package ua.com.danit.config;

import com.amazonaws.auth.PropertiesFileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class ApplicationBeans {

  @PostConstruct
  private void initializeModelMapper() {
    modelMapperConfig.initializeModelMapper();
  }

  @Value("${aws.s3.credentials.path}")
  private String s3CredentialsPath;

  @Autowired
  private ModelMapperConfig modelMapperConfig;

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Bean
  public AmazonS3Client amazonS3() {
    return (AmazonS3Client) AmazonS3ClientBuilder
        .standard()
        .withRegion(Regions.EU_CENTRAL_1)
        .withCredentials(new PropertiesFileCredentialsProvider(s3CredentialsPath))
        .build();
  }

}
