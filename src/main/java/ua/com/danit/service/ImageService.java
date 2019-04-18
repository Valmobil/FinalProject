package ua.com.danit.service;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.danit.entity.Image;
import ua.com.danit.entity.User;
import ua.com.danit.repository.ImageRepository;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

@Service
public class ImageService {
  private ImageRepository imageRepository;
  private UserTokensService userTokensService;


  @Autowired
  public ImageService(ImageRepository imageRepository, UserTokensService userTokensService) {
    this.imageRepository = imageRepository;
    this.userTokensService = userTokensService;
  }

  //  public Byte[] getImageService(Long imageId) throws IOException {
  //
  //    InputStream in = null;
  //    try {
  //      in = imageRepository.getOne(imageId).getImageBlob().getBinaryStream();
  //    } catch (SQLException e) {
  //      e.printStackTrace();
  //    }
  //    if (in == null) {
  //      return null;
  //    }
  //    return IOUtils.toByteArray(in);
  //  }

  public InputStream getImageService(Long imageId) throws IOException {
    InputStream in = null;
    try {
      in = imageRepository.getOne(imageId).getImageBlob().getBinaryStream();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    if (in == null) {
      return null;
    }
    return in;
  }

  //  private void saveFile(MultipartFile multipartFile, int id) throws Exception {
  //  //    String destination = "C:/Users/vtrapezn/IdeaProjects/FinalProject/src/main/resources/UsersPhotos/5.jpg";
  //  //    File file = new File(destination);
  //  //    multipartFile.transferTo(file);
  //  //  }

  public String saveNewImage(MultipartFile file, User user) {
    Image image = new Image();
    SerialBlob blob = null;
    try {
      byte[] inputStream = file.getBytes();
      blob = new SerialBlob(inputStream);
    } catch (SerialException e) {
      e.printStackTrace();
    } catch (SQLException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }
    image.setImageBlob(blob);
    if (user == null) {
      return null;
    }
    image.setUser(user);
    //    try {
    //      saveFile(file,1);
    //    } catch (Exception e) {
    //      e.printStackTrace();
    //    }
    image = imageRepository.save(image);
    return image.getImageId().toString();
  }

}
