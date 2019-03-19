package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;

import java.util.List;

public interface TripsRepository extends JpaRepository<Trip, Long> {
  Trip findByTripId(long tripId);

  List<Trip> findByUser(User user);
}
