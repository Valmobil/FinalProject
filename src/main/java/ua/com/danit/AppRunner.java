package ua.com.danit;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import ua.com.danit.service.XmlFileNewTreadService;


@SpringBootApplication
@EnableJpaRepositories
public class AppRunner {

  @Autowired
  ApplicationContext ctx;

  public static void main(String[] args) {
    ApplicationContext ctx;
    ctx = SpringApplication.run(AppRunner.class, args);


    //Start new tread for OpenStreet Points upload from XML to DB
    XmlFileNewTreadService readXml = (XmlFileNewTreadService) ctx.getBean("xmlFileNewTreadService");
    readXml.setName("Thread 1");

    readXml.start();


  }

}
