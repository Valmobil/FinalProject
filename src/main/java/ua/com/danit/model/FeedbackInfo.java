package ua.com.danit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.web.ProjectedPayload;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import java.text.SimpleDateFormat;

//@Projection
public interface FeedbackInfo {
  String getUserName();

  String getTripDateTime();

  String getUserType();

  Long getFeedbackTripIdWho();

  Long getFeedbackTripIdWhom();

  String getUserPhoto();

  String getTripPointNameFrom();

  String getTripPointNameTo();

  Integer getFeedbackValue();
}
