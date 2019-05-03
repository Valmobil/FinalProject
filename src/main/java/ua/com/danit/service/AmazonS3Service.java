package ua.com.danit.service;

import com.amazonaws.services.s3.AmazonS3Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.S3UploadResponse;

import java.io.IOException;
import java.util.UUID;

@Service
public class AmazonS3Service {

  public static final String S3_BUCKET_NAME = "rion-up-project";
  public static final String IMAGE_EXTENSION = ".png";
  private AmazonS3Client s3;

  @Autowired
  public AmazonS3Service(AmazonS3Client s3) {
    this.s3 = s3;
  }

  public S3UploadResponse putImage(MultipartFile file) throws IOException {
    String fileKey = generateS3FileKey();
    s3.putObject(S3_BUCKET_NAME, fileKey, file.getInputStream(), null);
    return S3UploadResponse.builder()
        .fileKey(fileKey)
        .fileResource(getUrlFromFileKey(fileKey))
        .build();
  }

  private String generateS3FileKey() {
    return UUID.randomUUID().toString() + IMAGE_EXTENSION;
  }

  public String getUrlFromFileKey(String fileKey) {
    return s3.getResourceUrl(S3_BUCKET_NAME, fileKey);
  }

  public void deleteObject(String fileKey) {
    s3.deleteObject(S3_BUCKET_NAME, fileKey);
  }

}
