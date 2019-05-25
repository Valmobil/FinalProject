package ua.com.danit.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GenericExceptionHandler {

  @ExceptionHandler({ApplicationException.class})
  public ResponseEntity<String> handleKnownException(ApplicationException exc) {
    // after creating controllers add known exceptions to annotation and
    // use different status code if needed
    log.warn(exc.getMessage());
    return new ResponseEntity<>(exc.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<String> handleUnknownException(Exception exc) {
    log.error(exc.getMessage(), exc);
    return new ResponseEntity<>(exc.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
