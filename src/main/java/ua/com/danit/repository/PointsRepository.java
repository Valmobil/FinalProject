package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Point;

public interface PointsRepository extends JpaRepository<Point, Long> {
}
