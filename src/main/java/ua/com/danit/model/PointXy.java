package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.awt.geom.Point2D;

@Data
@AllArgsConstructor
class PointXy {
    private double x;
    private double y;

  //  getSquareBySize(double sizeInMetter) {
  //    double earthRadius = 6371000; //meters
  //    double dLat = Math.toRadians(lat2-lat1);
  //    double dLng = Math.toRadians(lng2-lng1);
  //    double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  //        Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
  //            Math.sin(dLng/2) * Math.sin(dLng/2);
  //    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //    float dist = (float) (earthRadius * c);
  //
  //
  //    return dist;
  //  }
}
