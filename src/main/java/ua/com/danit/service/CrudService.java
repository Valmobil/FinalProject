package ua.com.danit.service;

import java.util.List;

public interface CrudService<E> {

  E getById(Long id);

  List<E> getAll();

  E create(E entity);

  E update(Long id, E entity);

  E delete(Long id);

}
