package ua.com.danit.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.danit.dto.TripPassengerRequest;
import ua.com.danit.dto.TripPassengerResponse;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPassenger;
import ua.com.danit.service.TripsService;

@Component
public class TripPassengerFacade extends AbstractDtoFacade<TripPassenger, TripPassengerRequest, TripPassengerResponse> {
  private TripsService tripsService;

  @Autowired
  public TripPassengerFacade(TripsService tripsService) {
    this.tripsService = tripsService;
  }

  @Override
  public TripPassenger mapRequestDtoToEntity(TripPassengerRequest dto) {
    TripPassenger tripPassenger = new TripPassenger();
    Trip basicTrip = tripsService.getOne(dto.getTripPassengerDriverTripId());
    tripPassenger.setTripPassenger(new Trip());
    tripPassenger.setTripDriver(new Trip());
    if (basicTrip.getUserCar() == null) {
      tripPassenger.getTripPassenger().setTripId(dto.getTripPassengerTripId());
      tripPassenger.getTripDriver().setTripId(dto.getTripPassengerDriverTripId());
      tripPassenger.setTripPassengerUserJoinStatus(dto.getTripPassengerJoinStatus());
    } else {
      tripPassenger.getTripPassenger().setTripId(dto.getTripPassengerTripId());
      tripPassenger.getTripDriver().setTripId(dto.getTripPassengerDriverTripId());
      tripPassenger.setTripPassengerDriverJoinStatus(dto.getTripPassengerJoinStatus());
    }
    return tripPassenger;
  }
}