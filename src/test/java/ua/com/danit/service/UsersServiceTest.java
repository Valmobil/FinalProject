package ua.com.danit.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;


class UsersServiceTest {
  private UsersService usersService;



  @Test
  void testNormilizeMobilePhone() {
//    assertEquals("+380504434433", usersService.normalizeMobilePhone("(050) 443-44-33"));
//    assertEquals("+380504434433", usersService.normalizeMobilePhone("+38(050)443-44-33"));
//    assertEquals("+380504434433", usersService.normalizeMobilePhone("38 050 4434433"));
  }

  @Test
  void testCheckEmailFormat() {
//    assertTrue(usersService.checkEmailFormat("we@def.com"));
//    assertFalse(usersService.checkEmailFormat("1@1.1"));
  }

//  @Test
//  void checkUserCredentialsNewUserRegistrationWithPhoneAndPassword() {
//    UserLogin userLogin = new UserLogin();
//    userLogin.setUserLogin("068-068-68-68");
//    userLogin.setUserPassword();
//  }
}