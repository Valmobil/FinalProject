package ua.com.danit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.dto.UserResponse;
import ua.com.danit.service.UsersService;


import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class LoginControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  UsersService usersService;

  @Test
  public void signUpByMailAndPassword() throws Exception {
    String password = "12345";
    String mail = "test12l5@gmail.com";

    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin(mail);
    userLogin.setUserPassword(password);
    userLogin.setUserPasswordNew(password);

    String chatUserLogin = objectMapper.writeValueAsString(userLogin);

    MvcResult result = mockMvc.perform(
        post("/api/logins/signup")
//            .with(csrf())
            .content(chatUserLogin)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    UserResponse userResponse = objectMapper.readValue(responseBody, UserResponse.class);

    assertEquals(mail, userResponse.getUserMail());
  }

  @Test
  public void signUpByPhoneAndPassword() throws Exception {
    String password = "12345";
    String phone = "068-531-12-12";

    UserLogin userLogin = new UserLogin();
    userLogin.setUserLogin(phone);
    userLogin.setUserPassword(password);
    userLogin.setUserPasswordNew(password);

    String chatUserLogin = objectMapper.writeValueAsString(userLogin);

    MvcResult result = mockMvc.perform(
        post("/api/logins/signup")
//            .with(csrf())
            .content(chatUserLogin)
            .contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    String responseBody = result.getResponse().getContentAsString();
    UserResponse userResponse = objectMapper.readValue(responseBody, UserResponse.class);

    assertEquals(usersService.normalizeAndCheckPhoneFormat(phone), userResponse.getUserPhone());
  }
}
