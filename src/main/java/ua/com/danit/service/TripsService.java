package ua.com.danit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.TripPassengerResponse;
import ua.com.danit.dto.TripResponse;
import ua.com.danit.dto.TripResponseId;
import ua.com.danit.dto.TripResponseWithUser;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPassenger;
import ua.com.danit.entity.TripPoint;
import ua.com.danit.entity.User;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.facade.TripFacade;
import ua.com.danit.facade.TripPassengerFacade;
import ua.com.danit.repository.TripPassengersRepository;
import ua.com.danit.repository.TripsRepository;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;


@Service
public class TripsService {
  private TripsRepository tripsRepository;
  private TripFacade tripFacade;
  private TripPassengersRepository tripPassengersRepository;
  private TripPassengerFacade tripPassengerFacade;

  @Autowired
  public TripsService(TripsRepository tripsRepository, TripFacade tripFacade,
                      TripPassengersRepository tripPassengersRepository, TripPassengerFacade tripPassengerFacade) {
    this.tripsRepository = tripsRepository;
    this.tripFacade = tripFacade;
    this.tripPassengersRepository = tripPassengersRepository;
    this.tripPassengerFacade = tripPassengerFacade;
  }

  public Trip getTripById(Long tripId) {
    return tripsRepository.getOne(tripId);
  }

  public TripResponseId putTripToDb(Trip trip, User user) {
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
    trip.setUser(user);
    trip = tripsRepository.save(trip);
    if (trip == null) {
      throw new ApplicationException("Error! Trip have not been saved!");
    }
    return new TripResponseId(trip.getTripId());
  }

  public List<TripResponseWithUser> getOwnAndOtherTrips(Trip tripOwn, User user) {
    List<Trip> trips = tripsRepository.findOwnTripAndOtherTrips(tripOwn.getTripId());
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

  public String deleteTripById(Long tripId, User user) {
    Trip trip = tripsRepository.getOne(tripId);
    if (trip.getUser().getUserId().equals(user.getUserId())) {
      trip.setTripIsDeleted(1);
      tripsRepository.save(trip);
    } else {
      throw new ApplicationException("Error! We try to delete trip of other user! The operation is rejected!");
    }
    return "Ok";
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

  public String putPassengers(List<TripPassengerResponse> tripPassengerResponse, User user) {
    List<TripPassenger> tripPassengers = tripPassengerFacade.mapRequestDtoListToEntityList(tripPassengerResponse);
    tripPassengers.forEach(u -> u.setUser(user));
    tripPassengersRepository.saveAll(tripPassengers);
    return "Ok";
  }
}

