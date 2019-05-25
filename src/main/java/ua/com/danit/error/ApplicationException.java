package ua.com.danit.error;

public class ApplicationException extends RuntimeException {
  public ApplicationException(String errorMessage) {
    super(errorMessage);
  }
}
