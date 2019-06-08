package ua.com.danit.facade;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Transactional
@SuppressWarnings("unchecked")
public abstract class AbstractDtoFacade<E, I, O> {

  @Autowired
  protected ModelMapper modelMapper;

  public O mapEntityToResponseDto(E entity) {
    if (entity != null) {
      return modelMapper.map(entity, (Class<O>) ((ParameterizedType) getClass()
          .getGenericSuperclass()).getActualTypeArguments()[2]);
    }
    return null;
  }

  protected E mapRequestDtoToEntity(I dto) {
    if (dto != null) {
      return modelMapper.map(dto, (Class<E>) ((ParameterizedType) getClass()
          .getGenericSuperclass()).getActualTypeArguments()[0]);
    }
    return null;
  }

  protected List<E> mapRequestDtoListToEntityList(List<I> dtoList) {
    if (dtoList != null) {
      return dtoList.stream()
          .map(this::mapRequestDtoToEntity)
          .collect(Collectors.toList());
    }
    return null;
  }

  protected List<O> mapEntityListToResponseDtoList(List<E> entityList) {
    if (entityList != null) {
      return entityList.stream()
          .map(this::mapEntityToResponseDto)
          .collect(Collectors.toList());
    }
    return new ArrayList<>();
  }

  protected Page<O> mapEntityListToResponseDtoList(Page<E> entityList) {
    if (entityList != null) {
      return entityList.map(this::mapEntityToResponseDto);
    }
    return null;
  }
}
