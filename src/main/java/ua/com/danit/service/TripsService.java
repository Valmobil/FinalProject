package ua.com.danit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Car;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPoint;
import ua.com.danit.entity.User;
import ua.com.danit.repository.TripsRepository;

import javax.persistence.Entity;
import java.io.IOException;
import java.util.LinkedList;
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


  public List<Trip> getOwnAndOtherTrips(User user) {
    List<Trip> trips = new LinkedList<>();
    trips.add(getTripById(1L));
    trips.add(getTripById(3L));
    trips.add(getTripById(4L));
    return trips;
  }


  public List<Trip> getTripListService(User user) {
    List<Trip> trips = new LinkedList<>();
    //Get list of trips except deleted ones
    for (Trip trip : tripsRepository.findByUser(user)) {
      if (trip.getTripIsDeleted() == 0) {
        trips.add(trip);
      }
    }
    return trips;
  }

  public void deleteTripById(Long tripId, User user) {
    Trip trip = tripsRepository.findByTripId(tripId);
    if (user != null) {
      if (trip.getUser().getUserId().equals(user.getUserId())) {
        trip.setTripIsDeleted(1);
        tripsRepository.save(trip);
      }
    }
  }

  public void copyTripById(long tripId, User user) {
    Trip trip = tripsRepository.findByTripId(tripId);
    if (user != null) {
      if (trip.getUser().getUserId().equals(user.getUserId())) {
        //create copy
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule() );
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        Trip tripDeepCopy = new Trip();
        try {
          tripDeepCopy = objectMapper.readValue(objectMapper.writeValueAsString(trip), Trip.class);
          //re-new some fields
          tripDeepCopy.setTripId(null);
          tripDeepCopy.setUser(user);
          tripDeepCopy.setCar(trip.getCar());
          for (TripPoint tripPoint : tripDeepCopy.getTripPoint()) {
            tripPoint.setTrip(tripDeepCopy);
            tripPoint.setTripPointId(null);
          }
          //Shift trip date 24 hours forward
          tripDeepCopy.setTripDateTime(trip.getTripDateTime().plusDays(1));
          tripsRepository.save(tripDeepCopy);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
  }
}

