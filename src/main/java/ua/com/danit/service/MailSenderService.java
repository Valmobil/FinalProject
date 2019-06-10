package ua.com.danit.service;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ua.com.danit.dto.LoginMode;
import ua.com.danit.dto.UserLogin;
import ua.com.danit.entity.PswdResetToken;
import ua.com.danit.entity.User;
import ua.com.danit.error.ApplicationException;
import ua.com.danit.repository.PswdResetTokenRepository;
import ua.com.danit.repository.UsersRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Service
public class MailSenderService {
  private JavaMailSender javaMailSender;
  private UsersService usersService;
  private LoginsService loginsService;
  private PswdResetTokenRepository pswdResetTokenRepository;
  private UsersRepository usersRepository;

  @Autowired
  MailSenderService(JavaMailSender javaMailSender,
                    UsersService usersService,
                    LoginsService loginsService,
                    PswdResetTokenRepository pswdResetTokenRepository,
                    UsersRepository usersRepository) {
    this.javaMailSender = javaMailSender;
    this.usersService = usersService;
    this.loginsService = loginsService;
    this.pswdResetTokenRepository = pswdResetTokenRepository;
    this.usersRepository = usersRepository;
  }


  public String sendEmailWithMailConfirmation(UserLogin userLogin, String contextPath, String endPoint) {
    if (userLogin == null) {
      throw new ApplicationException("Error: Please fill e-Mail cell!");
    }
    if (StringUtils.isEmpty(userLogin.getUserLogin())) {
      throw new ApplicationException("Error: Please fill e-Mail cell!");
    }
    usersService.checkEmailFormat(userLogin.getUserLogin());
    User user = usersService.createNewEmptyUser();
    LoginMode loginMode = LoginMode.builder()
        .isEmail(true)
        .endPoint(endPoint)
        .mode("")
        .build();
    user = usersService.findUserByEmail(userLogin.getUserLogin(), loginMode, user);
    loginsService.deletePswdResetTokensByUser(user);
    //Send mail and save token
    sendResetPasswordMail(user, contextPath, loginMode);
    //Set Confirmation letter was sent
    user.setUserIsConfirmedMail(1);
    usersRepository.save(user);
    return "Ok. The message was sent!";
  }

  private void sendResetPasswordMail(User user, String contextPath, LoginMode loginMode) {
    String token = UUID.randomUUID().toString();
    //save token in DB
    createPasswordResetTokenForUser(user, token);
    //Mail to user
    MimeMessage mimeMessage;
    if ("email".equals(loginMode.getEndPoint())) {
      mimeMessage = constructResetTokenEmail(contextPath, token, user);
    } else {
      mimeMessage = constructConfirmEmail(contextPath, token, user);
    }
    sendEmailInTread(mimeMessage);

  }

  @Async
  void sendEmailInTread(MimeMessage mimeMessage) {
    javaMailSender.send(mimeMessage);
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
        "<html><body>Добридень!<br><br>Ви отримали це повідомлення, бо Ви (маємо таку надію, що це були Ви) "
            + "хочете встановити новий пароль "
            + "<br><a href=\"" + url + "\">Please click for password restore!</a><br><br>З повагою, ваша комманда підтримки!</body></html>",
        "", user.getUserMail());
  }

  static String checkForLocalHost(String contextPath) {
    if (contextPath.substring(0, 9).equals("localhost")) {
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
      helper.setTo(to);
      helper.setText(msg, true);
      return message;
    } catch (MessagingException ignored) {
      throw new ApplicationException("Error! Cannot generate eMail via MimeMessage!");
    }
  }


  private void createPasswordResetTokenForUser(User user, String token) {
    PswdResetToken myToken = new PswdResetToken(token, user);
    pswdResetTokenRepository.save(myToken);
  }


}