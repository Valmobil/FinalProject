package ua.com.danit.dto;

import lombok.Data;

@Data
public class TripPassengerRequest {
  private long tripPassengerDriverTripId;
  private long tripPassengerTripId;
  private int tripPassengerJoinStatus;
}
