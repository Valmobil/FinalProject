package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.TripPassenger;
import ua.com.danit.entity.User;

import java.util.List;


public interface TripPassengersRepository extends JpaRepository<TripPassenger, Long> {
  List<TripPassenger> findByTripDriverAndAndTripPassenger(Trip tripDriver, Trip TripPassenger);
}
