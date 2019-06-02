package ua.com.danit.facade;

import org.springframework.stereotype.Component;
import ua.com.danit.dto.UserCarResponse;
import ua.com.danit.entity.UserCar;

import java.util.List;

@Component
public class UserCarFacade extends AbstractDtoFacade<UserCar, UserCarResponse, UserCarResponse> {

}