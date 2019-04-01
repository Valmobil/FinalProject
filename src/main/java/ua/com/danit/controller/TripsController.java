package ua.com.danit.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Trip;
import ua.com.danit.service.TripsService;

import java.util.List;

@JsonView(View.Summary.class)
@RestController
@RequestMapping("api/trips")
public class TripsController {
  private TripsService tripsService;

  @Autowired
  public TripsController(TripsService tripsService) {
    this.tripsService = tripsService;
  }

  @GetMapping("test")
  public Trip getTripById() {
    return tripsService.getTripById(1L);
  }

  @PutMapping("")
  public String saveTripToDb(@RequestBody Trip trip) {
    return tripsService.saveTripToDb(trip);
  }

  @GetMapping("list")
  public List<Trip> getUserTripList() {
    return tripsService.getTripListService();
  }

}
