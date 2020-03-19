package com.tydic.common;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.annotations.Param;

/**
 * Mapper顶级接口
 * @ClassName: BaseMapper 
 * @Description: TODO
 * @author linfeng.huang@isca.com.cn
 * @date 2015年8月25日 下午2:33:56 
 * 
 * @param <T>
 */
public interface BaseMapper<T extends Serializable> {
	/**
	 * 根据id查询
	 * @param id
	 * @return
	 */
	public T selectById(final long id);
	
	/**
	 * 查询所有
	 * @return
	 */
	public List<T> selectAll();
	
	/**
	 * 添加
	 * @param entity
	 */
	public void insert(final T entity);
	
	/**
	 * 修改
	 * @param entity
	 * @return
	 */
	public void update(final T entity);
	
	/**
	 * 删除
	 * @param entity
	 */
	public void delete(final T entity);
	
	/**
	 * 根据id删除
	 * @param entityId
	 */
	public void deleteById(final long entityId);
	
	/**
	 * 批量添加
	 * @Title: insertBatch 
	 * @Description: TODO
	 * @param entitys
	 */
	public void insertBatch(final @Param("entitys") List<T> entitys);
	
	/**
	 * 批量更新
	 * @Title: updateBatch 
	 * @Description: TODO
	 * @param entitys
	 * @return
	 */
	public T updateBatch(final @Param("entitys") List<T> entitys);
	
	/**
	 * 批量删除
	 * @Title: deleteBatch 
	 * @Description: TODO
	 * @param ids
	 */
	public void deleteBatchByIds(final @Param("ids") long[] ids);
	
	/**
	 * 批量删除
	 * @Title: deleteBatch 
	 * @Description: TODO
	 * @param ids
	 */
	public void deleteBatch(final @Param("entitys") List<T> entitys);
	
}
