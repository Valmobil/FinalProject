package ua.com.danit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class RootController {
  @GetMapping
  public String trueIndex() {
    return "forward:/index.html";
  }

  @GetMapping("**/{subpath:[^\\.]+}")
  public String fakeIndex() {
    return "forward:/index.html";
  }
}