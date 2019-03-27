package ua.com.danit.service;

import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static ua.com.danit.service.UsersService.*;


class UsersServiceTest {

  @Test
  void testNormilizeMobilePhone() {
    assertEquals("+380504434433", UsersService.normalizeMobilePhone("(050) 443-44-33"));
    assertEquals("+380504434433", UsersService.normalizeMobilePhone("+38(050)443-44-33"));
    assertEquals("+380504434433", UsersService.normalizeMobilePhone("38 050 4434433"));
  }

  @Test
  void testCheckEmailFormat() {
    assertTrue(checkEmailFormat("we@def.com"));
    assertFalse(checkEmailFormat("1@1.1"));
  }

}
