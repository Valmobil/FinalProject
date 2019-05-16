package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Feedback;
import ua.com.danit.dto.FeedbackInfo;
import ua.com.danit.service.FeedbacksService;
import ua.com.danit.service.UserTokensService;
import ua.com.danit.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("api/feedbacks")
public class FeedbacksController {
  private FeedbacksService feedbacksService;
  private UserTokensService userTokensService;

  @Autowired
  FeedbacksController(FeedbacksService feedbacksService, UsersService usersService,
                      UserTokensService userTokensService) {
    this.feedbacksService = feedbacksService;
    this.userTokensService = userTokensService;
  }

  @PostMapping
  public List<FeedbackInfo> getFeedbackFromDb(@RequestHeader String authorization) {
    return feedbacksService.getForNewListOfFeedback(userTokensService.findUserByAccessToken(authorization));
  }

  @PutMapping
  public List<FeedbackInfo> saveFeedbackToDb(@RequestBody List<Feedback> feedbaks, @RequestHeader String authorization) {
    return feedbacksService.saveForNewListOfFeedback(feedbaks, userTokensService.findUserByAccessToken(authorization));
  }
}
