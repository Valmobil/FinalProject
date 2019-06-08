package ua.com.danit.service;

import com.amazonaws.services.s3.AmazonS3Client;
import org.apache.commons.lang.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.User;

import java.io.ByteArrayInputStream;

@Service
public class ImageProviderAwsS3Service extends ImageDbProviderImpl {

  private static final String S3_BUCKET_NAME = "imagestoredev/users";
  private static final String IMAGE_EXTENSION = ".png";
  private AmazonS3Client s3;

  @Autowired
  public ImageProviderAwsS3Service(AmazonS3Client s3) {
    this.s3 = s3;
  }

  private String getUrlFromFileKey(String fileKey) {
    return s3.getResourceUrl(S3_BUCKET_NAME, fileKey);
  }

  public void deleteObject(String fileKey) {
    s3.deleteObject(S3_BUCKET_NAME, fileKey);
  }

  @Override
  public void init() {
    throw new NotImplementedException();
  }

  @Override
  public String putImage(byte[] file, User user, String name) {
    file = this.imageDeCompressPng(file);
    if ("".equals(name)) {
      name = newImageName() + IMAGE_EXTENSION;
    }
    s3.putObject(S3_BUCKET_NAME, name, new ByteArrayInputStream(file), null);
    return getUrlFromFileKey(name);
  }


  @Override
  public void getImage() {
    throw new NotImplementedException();
  }

}
