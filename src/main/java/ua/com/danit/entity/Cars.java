package ua.com.danit.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Cars {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long carsId;
  @ManyToOne
  @JoinColumn(name = "users_id")
  private Users user;
  private String carsName;
}
