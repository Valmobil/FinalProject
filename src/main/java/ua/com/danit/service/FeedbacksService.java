package ua.com.danit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.danit.entity.Feedback;
import ua.com.danit.entity.User;
import ua.com.danit.dto.FeedbackInfo;
import ua.com.danit.repository.FeedbacksRepository;
import ua.com.danit.repository.UsersRepository;

import java.util.Iterator;
import java.util.List;

@Service
public class FeedbacksService {

  private FeedbacksRepository feedbacksRepository;
  private UsersRepository usersRepository;

  @Autowired
  FeedbacksService(FeedbacksRepository feedbacksRepository,
                   UsersRepository usersRepository) {
    this.feedbacksRepository = feedbacksRepository;
    this.usersRepository = usersRepository;
  }

  public List<FeedbackInfo> getForNewListOfFeedback(User user) {
    return feedbacksRepository.getSqlData();
  }

  public List<FeedbackInfo> saveForNewListOfFeedback(List<Feedback> feedbaks, User userByAccessToken) {
    //Do not save records without values (evaluation)

    for (Iterator<Feedback> iterator = feedbaks.listIterator(); iterator.hasNext(); ) {
      Feedback feedback = iterator.next();
      if (feedback.getFeedbackValue() == 0) {
        iterator.remove();
      }
    }
    feedbacksRepository.saveAll(feedbaks);
    return feedbacksRepository.getSqlData();
  }
}
