package ua.com.danit.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.service.ImageService;
import ua.com.danit.service.UserTokensService;

@RestController
@RequestMapping("api/s3")
public class AmazonS3Controller {

  //  private AmazonS3Service s3Service;
  private ImageService imageService;
  private UserTokensService userTokensService;

  //  @Autowired
  //  public AmazonS3Controller(AmazonS3Service s3Service) {
  //    this.s3Service = s3Service;
  //  }
  //
  public AmazonS3Controller( ImageService imageService, UserTokensService userTokensService) {
    //    this.s3Service = s3Service;
    this.imageService = imageService;
    this.userTokensService = userTokensService;
  }

  //  @PostMapping("upload")
  //  public ResponseEntity<S3UploadResponse> uploadImageToS3(@RequestBody MultipartFile imageFile) throws IOException {
  //    return new ResponseEntity<>(s3Service.putImage(imageFile), HttpStatus.OK);
  //  }

  //  @PostMapping("upload")
  //  public String putImageController(@RequestParam("fileUpload") byte[] file,
  //                                    @RequestHeader String authorization) {
  //    return imageService.saveNewImageToS3(file, userTokensService.findUserByAccessToken(authorization));
  //  }
}
