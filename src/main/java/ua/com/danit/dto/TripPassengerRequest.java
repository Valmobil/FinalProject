package ua.com.danit.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class TripPassengerRequest {
  @NotNull
  private Long tripPassengerDriverTripId;
  @NotNull
  private Long tripPassengerTripId;
  @Min(0)
  @Max(4)
  private Integer tripPassengerJoinStatus;
}
