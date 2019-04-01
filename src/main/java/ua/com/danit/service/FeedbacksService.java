package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Feedback;
import ua.com.danit.entity.User;
import ua.com.danit.repository.FeedbacksRepository;
import ua.com.danit.repository.UsersRepository;

import java.util.List;

@Service
public class FeedbacksService {
  private FeedbacksRepository feedbacksRepository;
  private UsersRepository usersRepository;
  private SecurirtyService securirtyService;

  @Autowired
  FeedbacksService (FeedbacksRepository feedbacksRepository,
                    UsersRepository usersRepository,
                    SecurirtyService securirtyService) {
    this.feedbacksRepository = feedbacksRepository;
    this.usersRepository = usersRepository;
    this.securirtyService = securirtyService;
  }

  public List<Feedback> askForNewListOfFeedbacks () {
    return feedbacksRepository.findByUserWho(securirtyService.findUserByAccessToken());
  }
}
