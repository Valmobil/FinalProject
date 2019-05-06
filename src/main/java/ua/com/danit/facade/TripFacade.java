package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.TripPointResponse;
import ua.com.danit.dto.TripResponse;
import ua.com.danit.entity.Trip;

import java.util.LinkedList;
import java.util.List;

@Component
public class TripFacade extends AbstractDtoFacade<Trip, TripResponse, TripResponse> {
  private TripPointFacade tripPointFacade;

  public TripFacade(TripPointFacade tripPointFacade) {
    this.tripPointFacade = tripPointFacade;
  }

  @Override
  public TripResponse mapEntityToResponseDto(Trip entity) {
    TripResponse tripResponse = super.mapEntityToResponseDto(entity);
    List<TripPointResponse> tripPointResponses = tripPointFacade.mapEntityListToResponseDtoList(entity.getTripPoint());
    tripResponse.setTripPoint(tripPointResponses);
    return tripResponse;
  }

  @Override
  public List<TripResponse> mapEntityListToResponseDtoList(List<Trip> entityList) {
    List<TripResponse> tripResponses = new LinkedList<>();
    for (Trip trip : entityList) {
      tripResponses.add(mapEntityToResponseDto(trip));
    }
    return tripResponses;
  }
}
