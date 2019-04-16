package ua.com.danit.service;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import ua.com.danit.entity.Point;

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
public class XmlFilesService {
  private XmlFilePointSaveCashService xmlFilePointSaveCashService;

  @Autowired
  public XmlFilesService(XmlFilePointSaveCashService xmlFilePointSaveCashService) {
    this.xmlFilePointSaveCashService = xmlFilePointSaveCashService;
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
    } catch (ParserConfigurationException e) {
      e.printStackTrace();
    } catch (SAXException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
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
      e.printStackTrace();
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

      //Save points to DB
      xmlFilePointSaveCashService.savePointsToDb((Point) pointBw.getWrappedInstance());
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
