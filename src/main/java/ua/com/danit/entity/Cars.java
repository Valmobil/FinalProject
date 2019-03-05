package ua.com.danit.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
class Cars {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long carsId;
  @ManyToOne
  @JoinColumn(name = "users_id")
  private Users user;
  private String carsName;
}
