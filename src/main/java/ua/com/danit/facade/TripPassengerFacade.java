package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.TripPassengerRequest;
import ua.com.danit.dto.TripPassengerResponse;
import ua.com.danit.dto.UserCarResponse;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPassenger;
import ua.com.danit.entity.UserCar;

import java.util.List;

@Component
public class TripPassengerFacade extends AbstractDtoFacade<TripPassenger, TripPassengerRequest, TripPassengerResponse> {
  @Override
  public TripPassenger mapRequestDtoToEntity(TripPassengerRequest dto) {
    TripPassenger tripPassenger = new TripPassenger();
    tripPassenger.setTripPassenger(new Trip());
    tripPassenger.getTripPassenger().setTripId(dto.getTripPassengerTripId());
    tripPassenger.setTripDriver(new Trip());
    tripPassenger.getTripDriver().setTripId(dto.getTripPassengerDriverTripId());
    tripPassenger.setTripPassengerJoinStatus(dto.getTripPassengerJoinStatus());
    return tripPassenger;
  }
}