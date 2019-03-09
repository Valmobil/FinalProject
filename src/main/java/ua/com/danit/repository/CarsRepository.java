package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Car;

public interface CarsRepository extends JpaRepository<Car, Long> {
}
