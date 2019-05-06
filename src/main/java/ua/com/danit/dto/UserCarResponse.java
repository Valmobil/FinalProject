package ua.com.danit.dto;

import lombok.Data;

@Data
public class UserCarResponse {
  private long userCarId;
  private String userCarName;
  private String userCarColour;
  private String userCarPhoto;
}

