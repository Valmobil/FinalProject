package ua.com.danit.dao.userPoint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPointRequest{
  private Long userPointId;
  private String userPointName;
  private String userPointAddress;
  private double userPointLongitude;
  private double userPointLatitude;
}
