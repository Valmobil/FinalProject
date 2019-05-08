package ua.com.danit.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class XmlToPointStartThread {

  private Environment env;
  private XmlToPointDbService xmlToPointDbService;

  @Autowired
  XmlToPointStartThread(Environment env, XmlToPointDbService xmlToPointDbService) {
    this.xmlToPointDbService = xmlToPointDbService;
    this.env = env;
  }

  @PostConstruct
  void startThread() {
    xmlToPointDbService.start();
  }


}
