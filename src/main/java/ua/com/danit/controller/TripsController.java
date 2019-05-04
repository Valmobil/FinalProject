package ua.com.danit.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.dto.TripResponse;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;
import ua.com.danit.service.TripsService;
import ua.com.danit.service.UserTokensService;

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

  @PutMapping
  public String saveTripToDb(@RequestBody Trip trip) {
    return tripsService.saveTripToDb(trip);
  }

  @PostMapping("list")
  public RequestEntity<List<TripResponse>> getUserTripList(@RequestHeader String authorization) {
    return new RequestEntity<>(tripsService.getTripListService(userTokensService.findUserByAccessToken(authorization)),HttpStatus.OK);
  }

  @PostMapping("others")
  public RequestEntity<List<Trip>> getOtherUsersTripList(@RequestHeader String authorization) {
    return new RequestEntity<>(tripsService.getOwnAndOtherTrips(userTokensService.findUserByAccessToken(authorization)),HttpStatus.OK);
  }

  @PostMapping("copy")
  public List<Trip> copyUserTrip(@RequestBody Trip trip, @RequestHeader String authorization) {
    User user = userTokensService.findUserByAccessToken(authorization);
    tripsService.copyTripById(trip.getTripId(), user);
    return tripsService.getTripListService(user);
  }

  @DeleteMapping
  public void deleteUserTrip(@RequestBody Trip trip, @RequestHeader String authorization) {
    tripsService.deleteTripById(trip.getTripId(), userTokensService.findUserByAccessToken(authorization));
  }

}
