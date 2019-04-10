package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Image;
import ua.com.danit.service.ImageService;

import java.io.IOException;
import java.sql.Blob;

@RestController
@RequestMapping("api/images")
public class ImagesController {
  private ImageService imageService;

  @Autowired
  public ImagesController(ImageService imageService) {
    this.imageService = imageService;
  }

  @PostMapping("")
  public byte[] getImageController(@RequestBody Long imageId) throws IOException {
    return imageService.getImageService(imageId);
  }

  @PutMapping("")
  public String saveImageController(@RequestBody Blob imageBlob, @RequestHeader String userTokenAccess) {
    return imageService.saveNewImage(imageBlob, userTokenAccess);
  }


}
