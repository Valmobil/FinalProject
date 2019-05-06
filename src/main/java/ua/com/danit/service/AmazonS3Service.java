package ua.com.danit.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.S3UploadResponse;
import ua.com.danit.error.KnownException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class AmazonS3Service {

  @Autowired
  String awsS3Bucket;

  private AmazonS3 amazonS3;

  public AmazonS3Service(@Autowired Region awsRegion, @Autowired AWSCredentialsProvider awsCredentialsProvider) {
    this.amazonS3 = AmazonS3ClientBuilder.standard().withCredentials(awsCredentialsProvider)
        .withRegion(awsRegion.getName()).build();
  }


  public String putImage(byte[] file) {
    String fileKey = generateS3FileKey();
    try {
      this.amazonS3.putObject(this.awsS3Bucket, fileKey, new ByteArrayInputStream(file), null);
    } catch (AmazonServiceException e) {
      System.err.println(e.getErrorMessage());
      throw new KnownException("Error! File cannot be upload to AWS S3! Please see log for details.");
    }
    return awsS3Bucket;
  }

  public static final String IMAGE_EXTENSION = ".png";
//  private AmazonS3Client s3;
//
//  @Autowired
//  public AmazonS3Service(AmazonS3Client s3) {
//    this.s3 = s3;
//  }
//
//  public S3UploadResponse putImage(MultipartFile file) throws IOException {
//    String fileKey = generateS3FileKey();
//    s3.putObject(s3CredentialsBucketName, fileKey, file.getInputStream(), null);
//    return S3UploadResponse.builder()
//        .fileKey(fileKey)
//        .fileResource(getUrlFromFileKey(fileKey))
//        .build();
//  }

//  public S3UploadResponse putImage(byte[] file) {
//
//
//
//    String fileKey = generateS3FileKey();
//    s3.putObject(s3CredentialsBucketName, fileKey, new ByteArrayInputStream(file), null);
//    return S3UploadResponse.builder()
//        .fileKey(fileKey)
//        .fileResource(getUrlFromFileKey(fileKey))
//        .build();
//  }

  private String generateS3FileKey() {
    return UUID.randomUUID().toString() + IMAGE_EXTENSION;
  }

//  public String getUrlFromFileKey(String fileKey) {
//    return this.amazonS3.getResourceUrl(s3CredentialsBucketName, fileKey);
//  }

//  public void deleteObject(String fileKey) {
//    s3.deleteObject(s3CredentialsBucketName, fileKey);
//  }


}
