package ua.com.danit.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointSearch {
  private String pointSearchText;
  private double pointSearchLongitude;
  private double pointSearchLatitude;

}

