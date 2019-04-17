package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointSearch {
  private String pointSearchText;
  private double pointSearchLongitude;
  private double pointSearchLatitude;

}

