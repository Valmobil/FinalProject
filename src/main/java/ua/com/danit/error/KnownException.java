package ua.com.danit.error;

public class KnownException extends RuntimeException {
  public KnownException(String errorMessage) {
    super(errorMessage);
  }
}
