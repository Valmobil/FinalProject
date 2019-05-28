package ua.com.danit.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;


@Data
public class TripResponse {
  private Long tripId;
  private UserCarResponse userCar;
  private List<TripPointResponse> tripPoint;
  private LocalDateTime tripDateTime;
  private int tripSitsQty;
}