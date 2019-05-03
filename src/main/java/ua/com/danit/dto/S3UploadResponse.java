package ua.com.danit.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class S3UploadResponse {

  private String fileKey;
  private String fileResource;

}
