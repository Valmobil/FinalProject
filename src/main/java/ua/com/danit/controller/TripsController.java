package ua.com.danit.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;
import ua.com.danit.service.TripsService;
import ua.com.danit.service.UserTokensService;

import java.util.List;

//@JsonView(View.Summary.class)
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

  @GetMapping("test")
  public Trip getTripById() {
    return tripsService.getTripById(1L);
  }

  @PutMapping("")
  public String saveTripToDb(@RequestBody Trip trip) {
    return tripsService.saveTripToDb(trip);
  }

  @PostMapping("list")
  public List<Trip> getUserTripList(@RequestHeader String authorization) {
    return tripsService.getTripListService(userTokensService.findUserByAccessToken(authorization));
  }

  @PostMapping("delete")
  public void deleteUserTrip(@RequestBody Trip trip, @RequestHeader String authorization) {
    tripsService.deleteTripById(trip.getTripId(), userTokensService.findUserByAccessToken(authorization));
  }

  @PostMapping("copy")
  public List<Trip> copyUserTrip(@RequestBody Trip trip, @RequestHeader String authorization) {
    User user = userTokensService.findUserByAccessToken(authorization);
    tripsService.copyTripById(trip.getTripId(), user);
    return tripsService.getTripListService(user);
  }
}
