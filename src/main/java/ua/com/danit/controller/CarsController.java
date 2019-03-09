package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Car;
import ua.com.danit.service.CarsService;

@RestController
@RequestMapping("api/cars")
public class CarsController {
  private CarsService carsService;

  @Autowired
  public CarsController(CarsService carsService){
    this.carsService = carsService;
  }

  @PostMapping("{car_id}")
  public Car getCarById(@PathVariable("car_id") Long carId){
    return carsService.getCarById(carId);
  }

  @GetMapping("test")
  public Car getCarById(){
    return carsService.getCarById(1L);
  }

}
