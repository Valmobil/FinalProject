package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.service.ImageService;
import ua.com.danit.service.UserTokensService;

import java.io.IOException;

@RestController
@RequestMapping("api/images")
public class ImagesController {
  private ImageService imageService;
  private UserTokensService userTokensService;
  private static final String linkToPicture = "api/images/?id=";

  @Autowired
  public ImagesController(ImageService imageService, UserTokensService userTokensService) {
    this.imageService = imageService;
    this.userTokensService = userTokensService;
  }

  @GetMapping(value = "",produces = MediaType.IMAGE_JPEG_VALUE)
  public byte[] getImageControllerGet(@RequestParam String id) {
    return imageService.getImageService(id);
  }

  @PutMapping("")
  public String saveImageController(@RequestParam("fileUpload") byte[] file,
                                    ModelMap modelMap, @RequestHeader String authorization) {
    return linkToPicture + imageService.saveNewImage(file, userTokensService.findUserByAccessToken(authorization));
  }
}