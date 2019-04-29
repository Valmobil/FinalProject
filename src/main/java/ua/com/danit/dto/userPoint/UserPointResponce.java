package ua.com.danit.dto.userPoint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPointResponce {
  private Long userPointId;
  private String userPointName;
  private String userPointAddress;
  private double userPointLongitude;
  private double userPointLatitude;
}
