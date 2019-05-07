package ua.com.danit.service;

import org.codehaus.plexus.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Image;
import ua.com.danit.entity.User;
import ua.com.danit.error.KnownException;
import ua.com.danit.repository.ImageRepository;

@Service
public class ImageService {
  private ImageRepository imageRepository;
  private UserTokensService userTokensService;
  private AmazonS3Service amazonS3Service;

  @Autowired
  public ImageService(ImageRepository imageRepository, UserTokensService userTokensService, AmazonS3Service amazonS3Service) {
    this.imageRepository = imageRepository;
    this.userTokensService = userTokensService;
    this.amazonS3Service = amazonS3Service;
  }

  public byte[] getImageService(String imageId) {
    String[] parameters = imageId.split("_");
    if (parameters.length < 1) {
      return null;
    }
    return imageRepository.getOne(Long.valueOf(parameters[1])).getImageData();
  }

  public String saveNewImage(byte[] file, User user) {
    if (user == null) {
      throw new KnownException("Error! Cannot find user with such Access token!");
    }
    Image image = new Image();
    image.setUser(user);
    image.setImageData(Base64.decodeBase64(new String(file).split(",")[1].getBytes()));

    image = imageRepository.save(image);
    return user.getUserId().toString() + "_" + image.getImageId().toString();
  }

  public String saveNewImageToS3(byte[] file, User user) {
    if (user == null) {
      throw new KnownException("Error! Cannot find user with such Access token!");
    }
    byte[] fileDecoded = Base64.decodeBase64(new String(file).split(",")[1].getBytes());
    return amazonS3Service.putImage(file);
  }
}