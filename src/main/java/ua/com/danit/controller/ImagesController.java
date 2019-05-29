package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.service.ImageService;
import ua.com.danit.service.UserTokensService;

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

  @GetMapping(produces = MediaType.IMAGE_PNG_VALUE)
  public byte[] getImageControllerGet(@RequestParam String id) {
    return imageService.getImageService(id);
  }

  @PutMapping()
  public ResponseEntity<String> putImageController(@RequestBody byte[] file,
                                                   @RequestHeader String authorization,
                                                   @RequestHeader(value = "Host") String host) {
    return new ResponseEntity<>(imageService.saveImageToStorage(file,
        userTokensService.findUserByAccessToken(authorization), host),
        HttpStatus.OK);
  }
}