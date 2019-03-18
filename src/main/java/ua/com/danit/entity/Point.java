package ua.com.danit.entity;

import lombok.EqualsAndHashCode;
import lombok.Value;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Value
@Entity
@Table(name = "points")
@EqualsAndHashCode(callSuper = false)
public class Point extends Auditable {
  @Id
  //@ManyToMany
  //  @JoinTable(name="trip_point")
  private long pointId;
  private String pointNameEn;
  private String pointNameRu;
  private String pointNameUa;
  private double pointLongitude;
  private double pointLatitude;

}

