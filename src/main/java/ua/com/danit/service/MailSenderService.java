package ua.com.danit.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.PswdResetToken;
import ua.com.danit.entity.User;
import ua.com.danit.dao.UserLogin;
import ua.com.danit.repository.PswdResetTokenRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Service
public class MailSenderService {
  private UsersService usersService;
  private LoginsService loginsService;
  private PswdResetTokenRepository pswdResetTokenRepository;
  private JavaMailSender mailSender;

  @Autowired
  MailSenderService(UsersService usersService,
                    LoginsService loginsService,
                    PswdResetTokenRepository pswdResetTokenRepository,
                    JavaMailSender mailSender) {

    this.usersService = usersService;
    this.loginsService = loginsService;
    this.pswdResetTokenRepository = pswdResetTokenRepository;
    this.mailSender = mailSender;
  }

  public String checkUserByEmail(UserLogin userLogin, String contextPath) {
    if (userLogin == null) {
      return "Error: Please fill e-Mail cell!";
    }
    loginsService.convertUserLoginBlankToNull(userLogin);
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
    mailSender.send(constructResetTokenEmail(contextPath, token, user));
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
      MimeMessage message = mailSender.createMimeMessage();

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