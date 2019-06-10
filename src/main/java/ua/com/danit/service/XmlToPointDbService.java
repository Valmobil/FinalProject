package ua.com.danit.service;

import com.ibm.icu.text.Transliterator;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import ua.com.danit.entity.Point;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.repository.PointsRepository;

import javax.annotation.PostConstruct;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.File;
import java.io.IOException;

@Service
public class XmlToPointDbService extends Thread {
  private PointsRepository pointsRepository;
  private Environment env;

  @Autowired
  XmlToPointDbService(Environment env, PointsRepository pointsRepository) {
    this.pointsRepository = pointsRepository;
    this.env = env;
  }

  @Override
  public void run() {
    System.out.println("Map Points export from XML to DB start.");
    String xmlFileName = env.getProperty("application.map.xmlsource");
    String xmlFileReadRowsQty = env.getProperty("application.map.xmlsourcesavetodbqty");
    loadXmlFile(xmlFileName, xmlFileReadRowsQty);
    System.out.println("Map Points export from XML to DB is finished");
  }

  void loadXmlFile(String fileName, String xmlFileReadRowsQty) {
    //Read Root of XLS file
    File file = new File(fileName);
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder;
    Document xmlDoc = null;
    try {
      builder = factory.newDocumentBuilder();
      xmlDoc = builder.parse(file);
    } catch (ParserConfigurationException | SAXException | IOException e) {
      throw new ApplicationException("Error! Cannot parse map.xml!");
    }

    //Extract node list
    if (xmlDoc == null) {
      return;
    }
    XPath xpath = XPathFactory.newInstance().newXPath();
    Object res = null;
    try {
      res = xpath.evaluate("/osm/node",
          xmlDoc,
          XPathConstants.NODESET);
    } catch (XPathExpressionException e) {
      throw new ApplicationException("Error! Cannot read xml structure!");
    }
    if (res == null) {
      return;
    }

    //Read nodes
    NodeList nodeList = (NodeList) res;
    String[][] attr1 = {{"name:en", "pointNameEn"}, {"name:ru", "pointNameRu"}, {"name:uk", "pointNameUa"}};
    String[][] attr2 = {{"id", "pointId"}, {"lat", "pointLatitude"}, {"lon", "pointLongitude"}};
    for (int i = 0; i < nodeList.getLength(); i++) {
      Node node = nodeList.item(i);

      //get sub Nodes <TAG>
      NodeList subNodeList = node.getChildNodes();
      if (subNodeList.getLength() == 0) {
        continue;
      }
      BeanWrapper pointBw = new BeanWrapperImpl(new Point());
      boolean found = false;
      for (int j = 0; j < subNodeList.getLength(); j++) {
        Node subNode = subNodeList.item(j);
        if (getListOfAttributes(attr1, pointBw, subNode, 0)) {
          found = true;
        }
      }
      if (!found) {
        continue;
      }

      //Read attributes
      getListOfAttributes(attr2, pointBw, node, 1);

      //If English name not present
      Point point = (Point) pointBw.getWrappedInstance();
      if (point.getPointNameEn() == null) {
        if (point.getPointNameUa() != null) {
          Transliterator ukrainianToLatin = Transliterator.getInstance("Ukrainian-Latin/BGN");
          point.setPointNameEn(ukrainianToLatin.transliterate(point.getPointNameUa()));
        } else if (point.getPointNameRu() != null) {
          Transliterator russianToLatin = Transliterator.getInstance("Russian-Latin/BGN");
          point.setPointNameEn(russianToLatin.transliterate(point.getPointNameRu()));
        }
      }
      //Save points to DB
      pointsRepository.save(point);
    }
  }

  private Boolean getListOfAttributes(String[][] attr, BeanWrapper point, Node node, int type) {
    boolean foundedAtribute = false;
    if (type == 0) {
      //Read attributes for Type == 0
      String nodeAttributeValue = getAttrValue(node, "k");
      if (!"".equals(nodeAttributeValue)) {
        for (String[] strings : attr) {
          if (strings[0].equals(nodeAttributeValue)) {
            nodeAttributeValue = getAttrValue(node, "v");
            if (!"".equals(nodeAttributeValue)) {
              point.setPropertyValue(strings[1], nodeAttributeValue);
              foundedAtribute = true;
            }
          }
        }
      }
    } else {
      //Read attributes for Type == 1

      for (String[] strings : attr) {
        String nodeAttribute = getAttrValue(node, strings[0]);
        if (!"".equals(nodeAttribute)) {
          point.setPropertyValue(strings[1], nodeAttribute);
          foundedAtribute = true;
        }
      }
    }
    return foundedAtribute;
  }


  private String getAttrValue(Node node, String attrName) {
    if (!node.hasAttributes()) {
      return "";
    }
    NamedNodeMap nmap = node.getAttributes();
    if (nmap == null) {
      return "";
    }
    Node n = nmap.getNamedItem(attrName);
    if (n == null) {
      return "";
    }
    return n.getNodeValue();
  }


}
