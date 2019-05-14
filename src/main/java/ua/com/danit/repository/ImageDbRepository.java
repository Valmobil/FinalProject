package ua.com.danit.repository;

import org.hibernate.cfg.JPAIndexHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.ImageDb;

import java.util.UUID;

public interface ImageDbRepository extends JpaRepository<ImageDb, UUID> {
}
