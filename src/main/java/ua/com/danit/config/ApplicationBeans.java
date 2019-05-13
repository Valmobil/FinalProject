package ua.com.danit.config;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
  //  @Value("${aws.s3.credentials.path}")
  //  private String s3CredentialsPath;
  //  @Value("${aws.s3.credentials.accessKey}")
  //  private String awsKeyId;
  //  @Value("${aws.s3.credentials.secretKey}")
  //  private String awsKeySecret;
  //  @Value("${aws.s3.credentials.region}")
  //  String awsRegion;
  //  @Value("${aws.s3.credentials.bucket}")
  //  private String awsS3Bucket;
  //
  //
  //  @Bean(name = "awsKeyId")
  //  public String getAwsKeyId() {
  //    return awsKeyId;
  //  }
  //
  //  @Bean(name = "awsKeySecret")
  //  public String getAwsKeySecret() {
  //    return awsKeySecret;
  //  }
  //
  //  @Bean(name = "awsRegion")
  //  public Region getAwsPollyRegion() {
  //    return Region.getRegion(Regions.fromName(awsRegion));
  //  }
  //
  //  @Bean(name = "awsCredentialsProvider")
  //  public AWSCredentialsProvider getAwsCredentials() {
  //    BasicAWSCredentials awsCredentials = new BasicAWSCredentials(this.awsKeyId, this.awsKeySecret);
  //    return new AWSStaticCredentialsProvider(awsCredentials);
  //  }
  //
  //  @Bean(name = "awsS3Bucket")
  //  public String getAws3Bucket() {
  //    return awsS3Bucket;
  //  }


}
