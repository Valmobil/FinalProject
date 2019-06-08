package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Image;
import ua.com.danit.entity.ImageDb;
import ua.com.danit.entity.User;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.repository.ImageDbRepository;
import ua.com.danit.repository.ImagesRepository;

import java.util.UUID;

@Service
public class ImageProviderLocalDb extends ImageDbProviderImpl {

  private ImagesRepository imagesRepository;
  private ImageDbRepository imageDbRepository;

  @Autowired
  public ImageProviderLocalDb(ImagesRepository imagesRepository, ImageDbRepository imageDbRepository) {
    this.imagesRepository = imagesRepository;
    this.imageDbRepository = imageDbRepository;
  }

  @Override
  public void init() {

  }

  @Override
  public String putImage(byte[] file, User user, String name) {
    file = this.imageDeCompressPng(file);
    if ("".equals(name)) {
      name = newImageName();
    }
    ImageDb imageDb = new ImageDb();
    imageDb.setImageDbData(file);
    imageDb.setImageDbId(UUID.fromString(name));
    imageDb = imageDbRepository.save(imageDb);
    if (imageDb == null) {
      throw new ApplicationException("Error! Image cannot be uploaded to DB! Please try later or contact support team!");
    }
    Image image = Image.builder()
        .user(user)
        .imageName(name)
        .imageListOfServices("LocalDb")
        .build();
    imagesRepository.save(image);
    return name;
  }

  @Override
  public void getImage() {

  }
}
