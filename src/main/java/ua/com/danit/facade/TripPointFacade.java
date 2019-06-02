package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.TripPointResponse;
import ua.com.danit.dto.TripResponse;
import ua.com.danit.entity.TripPoint;

import java.util.List;

@Component
public class TripPointFacade extends AbstractDtoFacade<TripPoint, TripPointResponse, TripPointResponse> {

}
