package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import ua.com.danit.entity.Image;
import ua.com.danit.service.ImageService;
import ua.com.danit.service.UserTokensService;

import java.io.IOException;
import java.sql.Blob;

@RestController
@RequestMapping("api/images")
public class ImagesController {
  private ImageService imageService;
  private UserTokensService userTokensService;

  @Autowired
  public ImagesController(ImageService imageService, UserTokensService userTokensService) {
    this.imageService = imageService;
    this.userTokensService = userTokensService;
  }

  @PostMapping("")
  public byte[] getImageControllerPost(@RequestParam Long id) throws IOException {
    return imageService.getImageService(id);
  }

  @GetMapping("")
  public byte[] getImageControllerGet(@RequestParam Long id) throws IOException {
    return imageService.getImageService(id);
  }

  @PutMapping("")
  public String saveImageController(@RequestParam("fileUpload") MultipartFile file,
                                    ModelMap modelMap, @RequestHeader String authorization) {
    return imageService.saveNewImage(file, userTokensService.findUserByAccessToken(authorization));
  }
}