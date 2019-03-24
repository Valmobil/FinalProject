package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Point;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPoint;
import ua.com.danit.repository.TripsRepository;


@Service
public class TripsService {
  private TripsRepository tripsRepository;

  @Autowired
  public TripsService(TripsRepository tripsRepository) {
    this.tripsRepository = tripsRepository;
  }

  public Trip getTripById(Long tripId) {
    return tripsRepository.getOne(tripId);
  }

  public String saveTripToDb(Trip trip) {
    //Set TripId to TripPoints
    for (TripPoint point : trip.getTripPoint()) {
      point.setTrip(trip);
    }
    //Remove Car in Car == null
    if (trip.getCar().getCarId() == 0) {
      trip.setCar(null);
    }
    if (tripsRepository.save(trip) != null) {
      return "Ok";
    } else {
      return "Fail";
    }
  }
}
