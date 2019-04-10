package ua.com.danit.service;

import org.apache.commons.compress.utils.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Image;
import ua.com.danit.entity.User;
import ua.com.danit.repository.ImageRepository;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;

@Service
public class ImageService {
  private ImageRepository imageRepository;
  private UserTokensService userTokensService;


  @Autowired
  public ImageService(ImageRepository imageRepository) {
    this.imageRepository = imageRepository;
    this.userTokensService = userTokensService;
  }

  public byte[] getImageService(Long imageId) throws IOException {

    InputStream in = null;
    try {
      in = imageRepository.getOne(imageId).getImageBlob().getBinaryStream();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    return IOUtils.toByteArray(in);
  }

  public String saveNewImage(Blob imageBlob, String userTokenAccess) {
    Image image = new Image();
    image.setImageBlob(imageBlob);
    User user = userTokensService.findUserByAccessToken(userTokenAccess);
    if (user == null) {
      return null;
    }
    image.setUser(user);
    image = imageRepository.save(image);
    return image.getImageId().toString();
//    return image.getUser().getUserId().toString() +"_"+ image.getImageId().toString();
  }

}
