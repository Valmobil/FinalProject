package ua.com.danit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.danit.entity.Feedback;
import ua.com.danit.model.FeedbackInfo;
import ua.com.danit.service.FeedbacksService;
import ua.com.danit.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("api/feedbacks")
public class FeedbacksController {
  private FeedbacksService feedbacksService;
  //  private UsersService usersService;


  @Autowired
  FeedbacksController(FeedbacksService feedbacksService) {
    this.feedbacksService = feedbacksService;
  }

  @PostMapping("")
  public List<FeedbackInfo> getFeedbackFromDb() {
    return feedbacksService.askForNewListOfFeedbacks();
  }
}
