package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.ImageDb;
import ua.com.danit.entity.User;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.repository.ImageDbRepository;
import ua.com.danit.repository.ImagesRepository;

import java.io.File;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImageService {
  private ImagesRepository imagesRepository;
  private ImageDbRepository imageDbRepository;
  private UserTokensService userTokensService;
  private ImageProviderAwsS3Service imageProviderAwsS3Service;
  private ImageProviderLocalDb imageProviderLocalDb;

  @Autowired
  public ImageService(ImagesRepository imagesRepository, ImageDbRepository imageDbRepository,
                      UserTokensService userTokensService, ImageProviderAwsS3Service imageProviderAwsS3Service,
                      ImageProviderLocalDb imageProviderLocalDb) {
    this.imagesRepository = imagesRepository;
    this.imageDbRepository = imageDbRepository;
    this.userTokensService = userTokensService;
    this.imageProviderAwsS3Service = imageProviderAwsS3Service;
    this.imageProviderLocalDb = imageProviderLocalDb;
  }


  @Value("${aws.s3.credentials.path}")
  private String s3CredentialsPath;
  private static final String linkToLocalPicture = "/api/images/?id=";

  public String saveImageToStorage(byte[] file, User user, String host) {
    String imageName;
    if (checkWitchServiceCanBeUsed()) {
      imageName = imageProviderAwsS3Service.putImage(file, user, "");
      return addServerToImageName(imageName, "");
    } else {
      imageName = imageProviderLocalDb.putImage(file, user, "");
      return addServerToImageName(imageName, host);
    }
  }

  private boolean checkWitchServiceCanBeUsed() {
    //Check if S3 credentials is available
    File s3File = new File(s3CredentialsPath);
    return s3File.exists();
  }

  private String addServerToImageName(String imageName, String host) {
    if ("".equals(host)) {
      return imageName;
    } else {
      host = MailSenderService.checkForLocalHost(host);
      return host + linkToLocalPicture + imageName;
    }
  }

  public byte[] getImageService(String imageId) {
    if (imageId == null || "null".equals(imageId) || "".equals(imageId)) {
      throw new ApplicationException("Error! Image not found!");
    }
    Optional<ImageDb> image = imageDbRepository.findById(UUID.fromString(imageId));
    if (image.isPresent()) {
      return image.get().getImageDbData();
    } else {
      throw new ApplicationException("Error! Image not found!");
    }
  }


//    public String saveNewImageToS3(byte[] file, User user) {
//      byte[] fileDecoded = Base64.decodeBase64(new String(file).split(",")[1].getBytes());
//      return amazonS3Service.putImage(file);
//    }
}