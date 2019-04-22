package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import sun.nio.cs.ext.MacArabic;

@Data
@AllArgsConstructor
public class LineXy {
  private PointXy point1;
  private PointXy point2;
  private static final double kyivKhreschatikLatitude = 50.448228;
  private static final double meters_per_deg_lat = 111132.954 - 559.822 * Math.cos( 2 * kyivKhreschatikLatitude ) + 1.175 * Math.cos( 4 * kyivKhreschatikLatitude);
  private static final double meters_per_deg_lon = 111132.954 * Math.cos ( kyivKhreschatikLatitude );

  private double distanceOfTwoPoints(PointXy pp1, PointXy pp2) {
    double result;
    result = Math.sqrt(Math.pow((pp2.getX() - pp1.getX()), 2) + Math.pow((pp2.getY() - pp1.getY()), 2));
    return result;
  }

  public void distanceToPoint(PointXy p) {
    double distance;
    distance = Math.pow((this.point2.getX() - this.point1.getX()), 2) - Math.pow((this.point2.getY() - this.point1.getY()), 2);
    if (distance == 0) {
      distanceOfTwoPoints(p, this.point1);
    } else {
      double tx = (((p.getX() - point1.getX()) * (point2.getX() - point1.getX()) + (p.getY() - point1.getY()) * (point2.getY() - point1.getY())) / distance);
      if (tx < 0)
        distanceOfTwoPoints(point1, p);
      else if (tx > 1)
        distanceOfTwoPoints(point2, p);
      else {
        PointXy pp = new PointXy(point1.getX() + tx * (point2.getX() - point1.getX()), point1.getY() + tx * (point2.getY() - point1.getY()));
        distanceOfTwoPoints(pp, p);
      }
    }
  }
}
