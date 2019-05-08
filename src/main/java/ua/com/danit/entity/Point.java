package ua.com.danit.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Point {
  @Id
  private long pointId;
  private String pointNameEn;
  private String pointNameRu;
  private String pointNameUa;
  private double pointLongitude;
  private double pointLatitude;

}

