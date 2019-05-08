package ua.com.danit.dto;

import lombok.Data;

@Data
public class TripPointResponse {
  private Long tripPointId;
  private String tripPointName;
  private double tripPointLongitude;
  private double tripPointLatitude;
  private int tripPointSequence;
}
