package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.PswdResetToken;
import ua.com.danit.entity.User;
import ua.com.danit.model.UserLogin;
import ua.com.danit.repository.PswdResetTokenRepository;

import java.util.UUID;

@Service
public class PswdResetTokenService {
  private PswdResetTokenRepository pswdResetTokenRepository;
  private UsersService usersService;
  private LoginService loginService;
  private MailSender mailSender;

  @Autowired
  PswdResetTokenService(UsersService usersService,
                        LoginService loginService,
                        PswdResetTokenRepository pswdResetTokenRepository,
                        MailSender mailSender) {
    this.usersService = usersService;
    this.pswdResetTokenRepository = pswdResetTokenRepository;
    this.mailSender = mailSender;
  }

  public String checkUserByEmail(UserLogin userLogin, String contextPath) {
    if (userLogin == null) {
      return "Error: Please fill e-Mail cell!";
    }
    loginService.convertUserLoginBlankToNull(userLogin);
    if (userLogin.getUserLogin() == null) {
      return "Error: Please fill e-Mail cell!";
    }
    User user = usersService.checkLogin(userLogin);
    if (user == null) {
      return "Error: The e-Mail was not found!";
    }
    //Send mail and save token
    sendResetPasswordMail(user, contextPath);

    return "Ok. The message was sent!";
  }

  private void sendResetPasswordMail(User user, String contextPath) {
    String token = UUID.randomUUID().toString();
    //save token in DB
    createPasswordResetTokenForUser(user, token);
    //Mail token to user
    mailSender.getJavaMailSender().send(constructResetTokenEmail(contextPath, token, user));
  }

  private SimpleMailMessage constructResetTokenEmail(
      String contextPath, String token, User user) {
    String url = contextPath + "/user/changePassword?id=" + "&token=" + token;
    return constructEmail("Reset Password",
        "Добридень!\r\n Ви отримали це повідомлення, бо Ви (маємо таку надію) хочете змінити свій пароль "
            + " \r\n" + url, user);
  }

  private SimpleMailMessage constructEmail(String subject, String body,
                                           User user) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setSubject(subject);
    email.setText(body);
    email.setTo(user.getUserMail());
    //    email.setFrom(env.getProperty("support.email"));
    return email;
  }


  private void createPasswordResetTokenForUser(User user, String token) {
    PswdResetToken myToken = new PswdResetToken(token, user);
    pswdResetTokenRepository.save(myToken);
  }
}
