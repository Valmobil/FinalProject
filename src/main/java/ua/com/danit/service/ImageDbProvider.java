package ua.com.danit.service;

import ua.com.danit.entity.User;

public interface ImageDbProvider {
  void init();

  String putImage(byte[] file, User user, String name);

  void getImage();

}
