package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LineXy {
  private PointXy start;
  private PointXy end;

  private Double getDistance(PointXy start, PointXy end) {
    //    return Math.sqrt(Math.pow(start.getX() - end.getX(), 2) + Math.pow(start.getY() - end.getY(), 2));
    return 0.0;
  }

  public Double distBetweenPointAndLine(PointXy pointXy) {
    // A - the standalone point (x, y)
    // B - start point of the line segment (x1, y1)
    // C - end point of the line segment (x2, y2)
    // D - the crossing point between line from A to BC

    Double Ab = getDistance(pointXy, this.start);
    Double Bc = getDistance(this.start, this.end);
    Double Ac = getDistance(pointXy, this.end);

    // Heron's formula
    Double s = (Ab + Bc + Ac) / 2;
    Double area = Math.sqrt(s * (s - Ab) * (s - Bc) * (s - Ac));

    // but also area == (BC * AD) / 2
    // BC * AD == 2 * area
    // AD == (2 * area) / BC
    // TODO: check if BC == 0
    if (Bc == 0) {
      return Ab;
    } else {
      return ((2 * area) / Bc);
    }
  }
}
