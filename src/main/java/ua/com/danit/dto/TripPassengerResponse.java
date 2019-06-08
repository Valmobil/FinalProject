package ua.com.danit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import ua.com.danit.entity.Trip;
import ua.com.danit.entity.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class TripPassengerResponse {
  private Trip tripDriver;
  private Trip tripPassenger;
  private Integer tripPassengerJoinStatus;
}
