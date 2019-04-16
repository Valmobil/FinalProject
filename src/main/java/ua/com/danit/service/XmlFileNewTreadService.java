package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class XmlFileNewTreadService extends Thread {
  private XmlFilesService xmlFilesService;
  private Environment env;

  @Autowired
  XmlFileNewTreadService(XmlFilesService xmlFilesService, Environment env) {
    this.xmlFilesService = xmlFilesService;
    this.env = env;
  }

  @Override
  public void run() {
    System.out.println(getName() + " for Map Points export from XML is running");
    String xmlFileName = env.getProperty("application.map.xmlsource");
    String xmlFileReadRowsQty = env.getProperty("application.map.xmlsourcesavetodbqty");
    xmlFilesService.loadXmlFile(xmlFileName, xmlFileReadRowsQty);
    System.out.println(getName() + " is finished");
  }

}
