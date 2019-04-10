package ua.com.danit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPoint;
import ua.com.danit.repository.TripsRepository;

import java.io.IOException;
import java.util.List;


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
    //Remove Car if Car == null
    if (trip.getCar() != null) {
      if (trip.getCar().getCarId() == 0) {
        trip.setCar(null);
      }
    }
    if (tripsRepository.save(trip) != null) {
      return "Ok";
    } else {
      return "Fail";
    }
  }

  public List<Trip> getTripListService() {
    return tripsRepository.findAll();
  }

  public void deleteTripById(Long tripId) {
    tripsRepository.deleteById(tripId);
  }

  public void copyTripById(long tripId, String userTokenAccess) {
    Trip trip = tripsRepository.getOne(tripId);
    //create copy
    ObjectMapper objectMapper = new ObjectMapper();
    Trip tripDeepCopy = null;
    try {
      tripDeepCopy = objectMapper.readValue(objectMapper.writeValueAsString(trip), Trip.class);
    } catch (IOException e) {
      e.printStackTrace();
    }

    //re-new some fields
    if (tripDeepCopy.getUser() != null) {
      tripDeepCopy.getUser().setUserId(null);
    }
    for (TripPoint tripPoint : tripDeepCopy.getTripPoint()) {
      tripPoint.setTripPointId(null);
      tripPoint.setTrip(trip);
    }
    tripDeepCopy.setTripDateTime(trip.getTripDateTime().plusDays(1));
    tripsRepository.save(tripDeepCopy);
  }
}

