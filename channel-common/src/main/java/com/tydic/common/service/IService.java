package com.tydic.common.service;

import java.io.Serializable;
import java.util.List;

/**
 * service顶级接口
 * @author HLF
 *
 * @param <T>
 */
public interface IService<T extends Serializable> {
	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	public T find(final long id);
	
	/**
	 * 查询所有
	 * @return
	 */
	public List<T> findAll();
	
	/**
	 * 添加
	 * @param entity
	 */
	public void add(final T entity);
	
	/**
	 * 修改
	 * @param entity
	 * @return
	 */
	public void edit(final T entity);
	
	/**
	 * 删除
	 * @param entity
	 */
	public void remove(final T entity);
	
	/**
	 * 根据id删除
	 * @param entityId
	 */
	public void remove(final long entityId);
	
}
