package ua.com.danit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.danit.entity.Image;

public interface ImagesRepository extends JpaRepository<Image, Long> {
}
