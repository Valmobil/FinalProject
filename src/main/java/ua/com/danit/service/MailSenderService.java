package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.LoginMode;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.entity.PswdResetToken;
import ua.com.danit.entity.User;
import ua.com.danit.error.KnownException;
import ua.com.danit.repository.PswdResetTokenRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Service
public class MailSenderService {
  private JavaMailSender javaMailSender;
  private UsersService usersService;
  private LoginsService loginsService;
  private PswdResetTokenRepository pswdResetTokenRepository;

  @Autowired
  MailSenderService(JavaMailSender javaMailSender,
                    UsersService usersService,
                    LoginsService loginsService,
                    PswdResetTokenRepository pswdResetTokenRepository) {
    this.javaMailSender = javaMailSender;
    this.usersService = usersService;
    this.loginsService = loginsService;
    this.pswdResetTokenRepository = pswdResetTokenRepository;
  }

  public String sendEmailWithRestorationToken(UserLogin userLogin, String contextPath) {
    if (userLogin == null) {
      throw new KnownException("Error: Please fill e-Mail cell!");
    }
    loginsService.convertUserLoginBlankToNull(userLogin);
    if (userLogin.getUserLogin() == null) {
      throw new KnownException("Error: Please fill e-Mail cell!");
    }
    usersService.checkEmailFormat(userLogin.getUserLogin());
    User user = usersService.createNewEmptyUser();
    LoginMode loginMode = LoginMode.builder()
        .isEmail(true)
        .endPoint("SignIn")
        .mode("LoginByPassword")
        .build();
    user = usersService.findUserByEmail(userLogin.getUserLogin(), loginMode, user);
    //Send mail and save token
    sendResetPasswordMail(user, contextPath);

    return "Ok. The message was sent!";
  }

  private void sendResetPasswordMail(User user, String contextPath) {
    String token = UUID.randomUUID().toString();
    //save token in DB
    createPasswordResetTokenForUser(user, token);
    //Mail token to user
    javaMailSender.send(constructResetTokenEmail(contextPath, token, user));
  }

  private MimeMessage constructResetTokenEmail(
      String contextPath, String token, User user) {
    String url = contextPath + "/user/changePassword?id=" + "&token=" + token;
    return constructMimeMail("Reset Password",
        "Добридень!<br><br>Ви отримали це повідомлення, бо Ви (маємо таку надію що це були Ви) "
            + "хочете встановити свій новий пароль "
            + "<br><a href=\"" + url + "\">Please click for password restore!</a><br><br>З повагою, ваша комманда!",
        "", user.getUserMail());
  }

  private MimeMessage constructMimeMail(String subject, String msg, String from, String to) {
    try {
      MimeMessage message = javaMailSender.createMimeMessage();

      message.setSubject(subject);
      MimeMessageHelper helper;
      helper = new MimeMessageHelper(message, true);
      //      helper.setFrom(from);
      helper.setTo(to);
      helper.setText(msg, true);
      return message;
    } catch (MessagingException ignored) {
      return null;
    }
  }


  private void createPasswordResetTokenForUser(User user, String token) {
    PswdResetToken myToken = new PswdResetToken(token, user);
    pswdResetTokenRepository.save(myToken);
  }

}