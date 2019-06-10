package ua.com.danit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.TripPassengerRequest;
import ua.com.danit.dto.TripResponse;
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
import java.util.Optional;


@Service
public class TripsService {
  private TripsRepository tripsRepository;
  private TripFacade tripFacade;
  private TripPassengersRepository tripPassengersRepository;
  private TripPassengerFacade tripPassengerFacade;

  @Value("${spring.profiles.active}")
  private String springProfileActive;

  @Autowired
  public TripsService(TripsRepository tripsRepository, TripFacade tripFacade,
                      TripPassengersRepository tripPassengersRepository, TripPassengerFacade tripPassengerFacade) {
    this.tripsRepository = tripsRepository;
    this.tripFacade = tripFacade;
    this.tripPassengersRepository = tripPassengersRepository;
    this.tripPassengerFacade = tripPassengerFacade;
  }

  public String putTrip(Trip trip, User user) {
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
    return "{\"tripId\": " + trip.getTripId().toString() + "}";
  }

  public List<TripResponseWithUser> getOwnAndOtherTrips(Trip ownTrip, User user) {
    List<Trip> trips;
    if (springProfileActive.equals("local")) {
      trips = tripsRepository.findOwnTripAndOtherTripsH2(ownTrip.getTripId(), user.getUserId());
    } else {
      trips = tripsRepository.findOwnTripAndOtherTripsPg(ownTrip.getTripId(), user.getUserId());
    }
    List<TripPassenger> tripPassengers = tripPassengersRepository.findByTripDriverOrTripPassenger(ownTrip, ownTrip);
    List<TripResponseWithUser> tripResponsesWithUser = new LinkedList<>();
    for (Trip trip : trips) {
      TripResponseWithUser tripResponseWithUser = tripFacade.mapEntityToResponseDtoWithUser(trip);
      tripResponsesWithUser.add(tripResponseWithUser);
      for (TripPassenger tripPassenger : tripPassengers) {
        if (tripPassenger.getTripDriver().getTripId() == ownTrip.getTripId()
            && tripPassenger.getTripPassenger().getTripId() == trip.getTripId()) {
          tripResponseWithUser.setTripJoinStatus(generateJoinStatus("Driver",
              nullToEmpty(tripPassenger.getTripPassengerDriverJoinStatus()),
              nullToEmpty(tripPassenger.getTripPassengerUserJoinStatus())));
        } else if (tripPassenger.getTripPassenger().getTripId() == ownTrip.getTripId()
            && tripPassenger.getTripDriver().getTripId() == trip.getTripId()) {
          tripResponseWithUser.setTripJoinStatus(generateJoinStatus("Passenger",
              nullToEmpty(tripPassenger.getTripPassengerDriverJoinStatus()),
              nullToEmpty(tripPassenger.getTripPassengerUserJoinStatus())));
        }
      }
    }
    return tripResponsesWithUser;
  }

  private Integer nullToEmpty(Integer integer) {
    return (integer == null) ? 0 : integer;
  }

  private Integer generateJoinStatus(String mode, Integer driverJoinStatus, Integer userJoinStatus) {
    if (driverJoinStatus == 0 && userJoinStatus == 0) {
      return 0;
    }
    if (mode.equals("Driver") && driverJoinStatus > 0 && userJoinStatus == 0) {
      return 1;
    }
    if (!mode.equals("Driver") && driverJoinStatus == 0 && userJoinStatus > 0) {
      return 1;
    }
    if (mode.equals("Driver") && driverJoinStatus == 0 && userJoinStatus > 0) {
      return 2;
    }
    if (!mode.equals("Driver") && driverJoinStatus > 0 && userJoinStatus == 0) {
      return 2;
    }
    if (driverJoinStatus > 0 && userJoinStatus > 0) {
      return 3;
    }
    return 0;
  }

  public List<TripResponse> getTripListService(User user) {
    List<Trip> trips = tripsRepository.findByUserAndTripIsDeletedOrderByTripDateTimeDesc(user, 0);
    return tripFacade.mapEntityListToResponseDtoList(trips);
  }

  public String deleteTripById(Long tripId, User user) {
    Optional<Trip> op = tripsRepository.findById(tripId);
    Trip trip = null;
    if (op.isPresent()) {
      trip = op.get();
    } else {
      throw new ApplicationException("Error! Have no trip with this TripId! The operation is rejected!");
    }
    if (trip.getUser().getUserId().equals(user.getUserId())) {
      trip.setTripIsDeleted(1);
      tripsRepository.saveAndFlush(trip);
    } else {
      throw new ApplicationException("Error! We try to delete trip of other user! The operation is rejected!");
    }
    return "Ok";
  }

  public void copyTripById(long tripId, User user) {
    Trip trip = tripsRepository.findById(tripId).get();
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
          tripsRepository.saveAndFlush(tripDeepCopy);
        } catch (IOException e) {
          throw new ApplicationException("Cannot create deep copy of the trip!");
        }
      }
    }
  }


  public String putPassengers(TripPassengerRequest tripPassengerRequest, User user) {
    TripPassenger tripPassengers = tripPassengerFacade.mapRequestDtoToEntity(tripPassengerRequest);
    boolean userIsDriver = false;
    if (tripPassengerRequest.getTripPassengerDriverTripId() == tripPassengers.getTripDriver().getTripId()) {
      userIsDriver = true;
    }
    Boolean changesExists = combineStatuses(tripPassengers, userIsDriver);
    if (changesExists) {
      return "Please refresh list of trips!";
    } else {
      return "No changes!";
    }
  }

  private Boolean combineStatuses(TripPassenger tripPassenger, boolean userIsDriver) {
    List<TripPassenger> oldTripPass = tripPassengersRepository.findByTripDriverAndTripPassenger(
        tripPassenger.getTripDriver(),
        tripPassenger.getTripPassenger());
    Boolean sentMessageAboutChanges = false;
    if (oldTripPass.size() == 0) {
      tripPassenger.setTripPassengerId(null);
      tripPassengersRepository.saveAndFlush(tripPassenger);
    } else if (oldTripPass.size() == 1) {
      if (userIsDriver) {
        oldTripPass.get(0).setTripPassengerDriverJoinStatus(tripPassenger.getTripPassengerDriverJoinStatus());
      } else {
        oldTripPass.get(0).setTripPassengerUserJoinStatus(tripPassenger.getTripPassengerUserJoinStatus());
      }
      tripPassengersRepository.saveAndFlush(oldTripPass.get(0));
    } else {
      throw new ApplicationException("Error! The combination driverTripId and UserTripId has several instances!!!");
    }
    return sentMessageAboutChanges;
  }
}

