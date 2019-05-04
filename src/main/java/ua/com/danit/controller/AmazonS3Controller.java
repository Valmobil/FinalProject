package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.dto.S3UploadResponse;
import ua.com.danit.service.AmazonS3Service;

import java.io.IOException;

@RestController
@RequestMapping("api/s3")
public class AmazonS3Controller {

  private AmazonS3Service s3Service;

  @Autowired
  public AmazonS3Controller(AmazonS3Service s3Service) {
    this.s3Service = s3Service;
  }

  @PostMapping("upload")
  public ResponseEntity<S3UploadResponse> uploadImageToS3(@RequestBody MultipartFile imageFile) throws IOException {
    return new ResponseEntity<>(s3Service.putImage(imageFile), HttpStatus.OK);
  }

}
