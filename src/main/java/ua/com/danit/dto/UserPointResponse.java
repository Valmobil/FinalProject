package ua.com.danit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPointResponse {
  private Long userPointId;
  private String userPointName;
  private String userPointAddress;
  private double userPointLongitude;
  private double userPointLatitude;
}
