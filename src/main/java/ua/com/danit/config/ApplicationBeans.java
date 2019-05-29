package ua.com.danit.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.PropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class ApplicationBeans {

  //Model Mapper Configuration
  @Autowired
  private ModelMapperConfig modelMapperConfig;

  @PostConstruct
  private void initializeModelMapper() {
    modelMapperConfig.initializeModelMapper();
  }

  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }


  //AWS S3 config
  @Value("${aws.s3.credentials.path}")
  private String s3CredentialsPath;

  @Bean
  public AmazonS3Client amazonS3() {

    return (AmazonS3Client) AmazonS3ClientBuilder
        .standard()
        .withRegion(Regions.EU_CENTRAL_1)
        .withCredentials(new PropertiesFileCredentialsProvider(s3CredentialsPath))
        .build();
  }

}
