package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.TripPassengerResponse;
import ua.com.danit.dto.UserCarResponse;
import ua.com.danit.entity.TripPassenger;
import ua.com.danit.entity.UserCar;

import java.util.List;

@Component
public class TripPassengerFacade extends AbstractDtoFacade<TripPassenger, TripPassengerResponse, TripPassengerResponse> {

  @Override
  protected List<TripPassengerResponse> mapEntityListToResponseDtoList(List<TripPassenger> entityList) {
    return super.mapEntityListToResponseDtoList(entityList);
  }

  @Override
  public List<TripPassenger> mapRequestDtoListToEntityList(List<TripPassengerResponse> dtoList) {
    return super.mapRequestDtoListToEntityList(dtoList);
  }

}