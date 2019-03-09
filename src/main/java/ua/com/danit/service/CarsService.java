package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Car;
import ua.com.danit.repository.CarsRepository;

@Service
public class CarsService {
  private CarsRepository carsRepository;

  @Autowired
  public CarsService(CarsRepository carsRepository){
    this.carsRepository = carsRepository;
  }

  public Car createNewCar(Car car){
    return carsRepository.save(car);
  }

  public Car getCarById(Long carId){
    return carsRepository.getOne(carId);
  }
}
