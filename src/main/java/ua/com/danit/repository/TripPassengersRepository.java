package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.TripPassenger;


public interface TripPassengersRepository extends JpaRepository<TripPassenger, Long> {
}
