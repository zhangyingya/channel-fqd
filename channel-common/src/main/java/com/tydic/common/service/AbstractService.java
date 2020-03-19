package com.tydic.common.service;

import java.io.Serializable;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.tydic.common.BaseMapper;

/**
 * 所有的Service都要继承此类
 * @author HLF
 *
 * @param <T>
 */
public abstract class AbstractService<T extends Serializable> implements IService<T> {

	public abstract BaseMapper<T> getMapper();

	@Transactional(readOnly=true)
	@Override
	public T find(final long id) {
		return getMapper().selectById(id);
	}

	@Transactional(readOnly=true)
	@Override
	public List<T> findAll() {
		return getMapper().selectAll();
	}

	@Transactional
	@Override
	public void add(final T entity) {
		getMapper().insert(entity);
	}

	@Transactional
	@Override
	public void edit(final T entity) {
		getMapper().update(entity);
	}

	@Transactional
	@Override
	public void remove(final T entity) {
		getMapper().delete(entity);
	}

	@Transactional
	@Override
	public void remove(final long entityId) {
		getMapper().deleteById(entityId);
	}
	
}
