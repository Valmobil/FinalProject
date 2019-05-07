package ua.com.danit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.TripResponse;
import ua.com.danit.dto.TripResponseWithUser;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPoint;
import ua.com.danit.entity.User;
import ua.com.danit.error.KnownException;
import ua.com.danit.facade.TripFacade;
import ua.com.danit.repository.TripsRepository;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;


@Service
public class TripsService {
  private TripsRepository tripsRepository;
  private TripFacade tripFacade;

  @Autowired
  public TripsService(TripsRepository tripsRepository, TripFacade tripFacade) {
    this.tripsRepository = tripsRepository;
    this.tripFacade = tripFacade;
  }

  public Trip getTripById(Long tripId) {
    return tripsRepository.getOne(tripId);
  }

  public String saveTripToDb(Trip trip) {
    //Set TripId to TripPoints
    for (TripPoint point : trip.getTripPoint()) {
      point.setTrip(trip);
    }
    //Remove UserCar if UserCar == null
    if (trip.getUserCar() != null) {
      if (trip.getUserCar().getUserCarId() == 0) {
        trip.setUserCar(null);
      }
    }
    if (tripsRepository.save(trip) != null) {
      return "Ok";
    } else {
      throw new KnownException("Error! Trip have not been saved!");
    }
  }

  public List<TripResponseWithUser> getOwnAndOtherTrips(User user) {
    List<Trip> trips = new LinkedList<>();
    trips.add(tripsRepository.getOne(1L));
    trips.add(tripsRepository.getOne(3L));
    trips.add(tripsRepository.getOne(4L));
    List<TripResponseWithUser> tripResponses = new LinkedList<>();
    for (Trip trip : trips) {
      tripResponses.add(tripFacade.mapEntityToResponseDtoWithUser(trip));
    }
    return tripResponses;
  }

  public List<TripResponse> getTripListService(User user) {
    List<Trip> trips = new LinkedList<>();
    //Get list of trips except deleted ones
    for (Trip trip : tripsRepository.findByUser(user)) {
      if (trip.getTripIsDeleted() == 0) {
        trips.add(trip);
      }
    }
    return tripFacade.mapEntityListToResponseDtoList(trips);
  }

  public void deleteTripById(Long tripId, User user) {
    Trip trip = tripsRepository.getOne(tripId);
    if (user != null) {
      if (trip.getUser().getUserId().equals(user.getUserId())) {
        trip.setTripIsDeleted(1);
        tripsRepository.save(trip);
      }
    }
  }

  public void copyTripById(long tripId, User user) {
    Trip trip = tripsRepository.getOne(tripId);
    if (user != null) {
      if (trip.getUser().getUserId().equals(user.getUserId())) {
        //create copy
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        Trip tripDeepCopy;
        try {
          tripDeepCopy = objectMapper.readValue(objectMapper.writeValueAsString(trip), Trip.class);
          //re-new some fields
          tripDeepCopy.setTripId(null);
          tripDeepCopy.setUser(user);
          tripDeepCopy.setUserCar(trip.getUserCar());
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

