package ua.com.danit.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModelMapperConfig {

  private ModelMapper modelMapper;

  @Autowired
  public ModelMapperConfig(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public void initializeModelMapper() {
    //    addUserMapping();
    //    addEventCategoryMapping();
    //    addBusinessPhotoMapping();
    //    addPlacePhotoMapping();
    //    addEventPhotoMapping();
  }


  //  private void addUserMapping() {
  //    modelMapper.addMappings(new PropertyMap<User, UserResponse>() {
  //      @Override
  //      protected void configure() {
  //      }
  //    });
  //    modelMapper.getTypeMap(User.class, UserResponse.class)
  //        .setPostConverter(context -> {
  //          UserResponse destination = context.getDestination();
  //          User source = context.getSource();
  //          String imageKey = source.getImageKey();
  //          String iconKey = source.getIconKey();
  //          if (imageKey != null) {
  //            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
  //          }
  //          if (iconKey != null) {
  //            destination.setIconUrl(amazonS3Service.getUrlFromFileKey(iconKey));
  //          }
  //          return destination;
  //        });
  //  }

  //  private void addEventCategoryMapping() {
  //    modelMapper.addMappings(new PropertyMap<EventCategory, EventCategoryResponse>() {
  //      @Override
  //      protected void configure() { }
  //    });
  //    modelMapper.getTypeMap(EventCategory.class, EventCategoryResponse.class)
  //        .setPostConverter(context -> {
  //          EventCategoryResponse destination = context.getDestination();
  //          EventCategory source = context.getSource();
  //          String imageKey = source.getImageKey();
  //          if (imageKey != null) {
  //            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
  //          }
  //          return destination;
  //        });
  //  }
  //
  //  private void addBusinessPhotoMapping() {
  //    modelMapper.addMappings(new PropertyMap<BusinessPhoto, BusinessPhotoResponse>() {
  //      @Override
  //      protected void configure() { }
  //    });
  //    modelMapper.getTypeMap(BusinessPhoto.class, BusinessPhotoResponse.class)
  //        .setPostConverter(context -> {
  //          BusinessPhotoResponse destination = context.getDestination();
  //          BusinessPhoto source = context.getSource();
  //          String imageKey = source.getImageKey();
  //          if (imageKey != null) {
  //            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
  //          }
  //          return destination;
  //        });
  //  }
  //
  //  private void addPlacePhotoMapping() {
  //    modelMapper.addMappings(new PropertyMap<PlacePhoto, PlacePhotoResponse>() {
  //      @Override
  //      protected void configure() { }
  //    });
  //    modelMapper.getTypeMap(PlacePhoto.class, PlacePhotoResponse.class)
  //        .setPostConverter(context -> {
  //          PlacePhotoResponse destination = context.getDestination();
  //          PlacePhoto source = context.getSource();
  //          String imageKey = source.getImageKey();
  //          if (imageKey != null) {
  //            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
  //          }
  //          return destination;
  //        });
  //  }
  //
  //  private void addEventPhotoMapping() {
  //    modelMapper.addMappings(new PropertyMap<EventPhoto, EventPhotoResponse>() {
  //      @Override
  //      protected void configure() { }
  //    });
  //    modelMapper.getTypeMap(EventPhoto.class, EventPhotoResponse.class)
  //        .setPostConverter(context -> {
  //          EventPhotoResponse destination = context.getDestination();
  //          EventPhoto source = context.getSource();
  //          String imageKey = source.getImageKey();
  //          if (imageKey != null) {
  //            destination.setImageUrl(amazonS3Service.getUrlFromFileKey(imageKey));
  //          }
  //          return destination;
  //        });
  //  }

}
