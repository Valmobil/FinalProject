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


  public String sendEmailWithMailConfirmation(UserLogin userLogin, String contextPath, String endPoint) {
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
        .endPoint(endPoint)
        .mode("")
        .build();
    user = usersService.findUserByEmail(userLogin.getUserLogin(), loginMode, user);
    //Send mail and save token
    sendResetPasswordMail(user, contextPath, loginMode);

    return "Ok. The message was sent!";
  }

  private void sendResetPasswordMail(User user, String contextPath, LoginMode loginMode) {
    String token = UUID.randomUUID().toString();
    //save token in DB
    createPasswordResetTokenForUser(user, token);
    //Mail to user
    if ("email".equals(loginMode.getEndPoint())) {
      javaMailSender.send(constructResetTokenEmail(contextPath, token, user));
    } else {
      javaMailSender.send(constructConfirmEmail(contextPath, token, user));
    }
  }

  private MimeMessage constructConfirmEmail(
      String contextPath, String token, User user) {
    contextPath = checkForLocalHost(contextPath);
    String url = contextPath + "/api/logins/confirmemailstatus?token=" + token;
    return constructMimeMail("Confirm Email",
        "<html><body>Добридень!<br><br>Ви отримали це повідомлення, бо Ви (маємо таку надію, що це були Ви) "
            + "зареєструвалися і хочете підтвердити свою поштову адресу "
            + "<br><a href=\"" + url + "\">Please click for mail confirmation!</a><br><br>З повагою, ваша комманда підтримки!</body></html>",
        "", user.getUserMail());
  }

  private MimeMessage constructResetTokenEmail(
      String contextPath, String token, User user) {
    contextPath = checkForLocalHost(contextPath);
    String url = contextPath + "/user/changePassword?id=" + "&token=" + token;
    return constructMimeMail("Reset Password",
        "<html><body>Добридень!<br><br>Ви отримали це повідомлення, бо Ви (маємо таку надію? що це були Ви) "
            + "хочете встановити новий пароль "
            + "<br><a href=\"" + url + "\">Please click for password restore!</a><br><br>З повагою, ваша комманда підтримки!</body></html>",
        "", user.getUserMail());
  }

  static String checkForLocalHost(String contextPath) {
    if (contextPath.substring(0,9).equals("localhost")) {
      return "http://" + contextPath;
    }
    return contextPath;
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

  public String receiveMailConfirmation(String host) {
    return "Ok just for test";
  }
}