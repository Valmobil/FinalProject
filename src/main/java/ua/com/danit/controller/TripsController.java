package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.TripPassengerRequest;
import ua.com.danit.dto.TripResponse;
import ua.com.danit.dto.TripResponseWithUser;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;
import ua.com.danit.service.TripsService;
import ua.com.danit.service.UserTokensService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/trips")
public class TripsController {
  private TripsService tripsService;
  private UserTokensService userTokensService;

  @Autowired
  public TripsController(TripsService tripsService, UserTokensService userTokensService) {
    this.tripsService = tripsService;
    this.userTokensService = userTokensService;
  }

  @PostMapping
  public ResponseEntity<String> saveTrip(@RequestBody Trip trip, @RequestHeader String authorization) {
    return new ResponseEntity<>(tripsService.putTrip(trip, userTokensService.findUserByAccessToken(authorization)),
        HttpStatus.OK);
  }

  @GetMapping()
  public ResponseEntity<List<TripResponse>> getUserTripList(@RequestHeader String authorization) {
    return new ResponseEntity<>(tripsService.getTripListService(userTokensService.findUserByAccessToken(authorization)),
        HttpStatus.OK);
  }

  @PostMapping("others")
  public ResponseEntity<List<TripResponseWithUser>> getOtherUsersTripList(@RequestBody Trip trip,
                                                                          @RequestHeader String authorization) {
    return new ResponseEntity<>(tripsService.getOwnAndOtherTrips(trip,
        userTokensService.findUserByAccessToken(authorization)), HttpStatus.OK);
  }

  @PostMapping("copy")
  public ResponseEntity<List<TripResponse>> copyUserTrip(@RequestBody Trip trip, @RequestHeader String authorization) {
    User user = userTokensService.findUserByAccessToken(authorization);
    tripsService.copyTripById(trip.getTripId(), user);
    return new ResponseEntity<>(tripsService.getTripListService(user), HttpStatus.OK);
  }

  @DeleteMapping
  public ResponseEntity<String> deleteUserTrip(@RequestBody Trip trip, @RequestHeader String authorization) {
    return new ResponseEntity<>(tripsService.deleteTripById(trip.getTripId(),
        userTokensService.findUserByAccessToken(authorization)), HttpStatus.OK);
  }

  @PostMapping("passengers")
  public ResponseEntity<String> putSelectedPassengers(@Valid @RequestBody TripPassengerRequest tripPassengersRequest,
                                                      @RequestHeader String authorization) {
    return new ResponseEntity<>(tripsService.putPassengers(tripPassengersRequest,
        userTokensService.findUserByAccessToken(authorization)), HttpStatus.OK);
  }
}
