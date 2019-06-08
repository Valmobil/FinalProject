package ua.com.danit.service;

import org.codehaus.plexus.util.Base64;
import ua.com.danit.entity.User;

import java.util.UUID;

public abstract class ImageDbProviderImpl implements ImageDbProvider {


  byte[] imageDeCompressPng(byte[] file) {
    return Base64.decodeBase64(new String(file).split(",")[1].getBytes());
  }

  String newImageName() {
    return UUID.randomUUID().toString();
  }

  public String selectImageSource(String userPhoto) {
    //Please implement image selector
    //TODO
    return userPhoto;
  }
}
