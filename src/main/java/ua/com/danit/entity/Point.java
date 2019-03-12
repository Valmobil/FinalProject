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
  private long point_id;
  private String point_name_en;
  private String point_name_ru;
  private String point_name_ua;
}

