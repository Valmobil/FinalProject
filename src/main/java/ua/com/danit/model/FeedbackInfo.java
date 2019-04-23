package ua.com.danit.model;

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
