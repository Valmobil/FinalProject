package ua.com.danit.dto;

import lombok.Data;

@Data
public class TripPassengerRequest {
  private Long tripPassengerDriverTripId;
  private Long tripPassengerTripId;
  private Integer tripPassengerJoinStatus;
}
